// ========================================
// Import Required Modules
// ========================================

// Express: Web framework for creating REST APIs
const express = require('express');

// CORS: Allows frontend to communicate with backend
const cors = require('cors');

// File System: For reading and writing JSON files
const fs = require('fs');

// Path: For handling file paths
const path = require('path');

// ========================================
// Create Express Application
// ========================================

const app = express();

// ========================================
// Middleware Configuration
// ========================================

// Enable CORS to allow frontend requests
app.use(cors());

// Parse JSON data from request body
app.use(express.json());

// ========================================
// File Path Configuration
// ========================================

// Path to students.json file
const studentsFilePath = path.join(__dirname, 'students.json');

// ========================================
// Helper Functions
// ========================================

// Function to read students from JSON file
const readStudentsFromFile = () => {
    try {
        // Check if file exists
        if (!fs.existsSync(studentsFilePath)) {
            // If file doesn't exist, create it with empty array
            fs.writeFileSync(studentsFilePath, JSON.stringify([], null, 2));
            return [];
        }
        
        // Read file content
        const fileData = fs.readFileSync(studentsFilePath, 'utf-8');
        
        // Convert JSON string to JavaScript array
        const students = JSON.parse(fileData);
        
        return students;
        
    } catch (error) {
        console.error('Error reading students file:', error);
        return [];
    }
};

// Function to write students to JSON file
const writeStudentsToFile = (students) => {
    try {
        // Convert JavaScript array to JSON string with proper formatting
        const jsonData = JSON.stringify(students, null, 2);
        
        // Write to file
        fs.writeFileSync(studentsFilePath, jsonData, 'utf-8');
        
        return true;
        
    } catch (error) {
        console.error('Error writing to students file:', error);
        return false;
    }
};

// Function to generate unique student ID
const generateStudentId = () => {
    // Get current timestamp
    const timestamp = Date.now();
    
    // Generate random number
    const randomNum = Math.floor(Math.random() * 1000);
    
    // Combine to create unique ID
    const studentId = `STD${timestamp}${randomNum}`;
    
    return studentId;
};

// ========================================
// API Routes
// ========================================

// Root route - API welcome message
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Student Management System API',
        endpoints: {
            getStudents: 'GET /students',
            addStudent: 'POST /students',
            deleteStudent: 'DELETE /students/:id'
        }
    });
});

// ========================================
// GET /students - Get all students
// ========================================

app.get('/students', (req, res) => {
    try {
        // Read students from file
        const students = readStudentsFromFile();
        
        // Send students data as response
        res.status(200).json(students);
        
    } catch (error) {
        // Send error response
        res.status(500).json({
            message: 'Error retrieving students',
            error: error.message
        });
    }
});

// ========================================
// POST /students - Register new student
// ========================================

app.post('/students', (req, res) => {
    try {
        // Get student data from request body
        const { fullName, email, phone, department, semester, gender } = req.body;
        
        // Validate required fields
        if (!fullName || !email || !phone || !department || !semester || !gender) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        
        // Read existing students
        const students = readStudentsFromFile();
        
        // Check if email already exists
        const emailExists = students.find(student => student.email === email);
        if (emailExists) {
            return res.status(400).json({
                message: 'Student with this email already exists'
            });
        }
        
        // Create new student object
        const newStudent = {
            id: generateStudentId(),
            fullName: fullName,
            email: email,
            phone: phone,
            department: department,
            semester: semester,
            gender: gender,
            registeredAt: new Date().toLocaleString()
        };
        
        // Add new student to array
        students.push(newStudent);
        
        // Write updated data to file
        const writeSuccess = writeStudentsToFile(students);
        
        if (!writeSuccess) {
            return res.status(500).json({
                message: 'Error saving student data'
            });
        }
        
        // Send success response
        res.status(201).json({
            message: 'Student registered successfully',
            student: newStudent
        });
        
    } catch (error) {
        // Send error response
        res.status(500).json({
            message: 'Error registering student',
            error: error.message
        });
    }
});

// ========================================
// DELETE /students/:id - Delete student by ID
// ========================================

app.delete('/students/:id', (req, res) => {
    try {
        // Get student ID from URL parameter
        const studentId = req.params.id;
        
        // Read existing students
        let students = readStudentsFromFile();
        
        // Find student index
        const studentIndex = students.findIndex(student => student.id === studentId);
        
        // Check if student exists
        if (studentIndex === -1) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        
        // Remove student from array
        const deletedStudent = students.splice(studentIndex, 1);
        
        // Write updated data to file
        const writeSuccess = writeStudentsToFile(students);
        
        if (!writeSuccess) {
            return res.status(500).json({
                message: 'Error deleting student'
            });
        }
        
        // Send success response
        res.status(200).json({
            message: 'Student deleted successfully',
            student: deletedStudent[0]
        });
        
    } catch (error) {
        // Send error response
        res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
});

// ========================================
// Start Server
// ========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📁 Students data will be stored in: ${studentsFilePath}`);
});
