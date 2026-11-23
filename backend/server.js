const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const studentsFilePath = path.join(__dirname, 'students.json');

const readStudentsFromFile = () => {
    try {
        if (!fs.existsSync(studentsFilePath)) {
            fs.writeFileSync(studentsFilePath, JSON.stringify([], null, 2));
            return [];
        }
        
        const fileData = fs.readFileSync(studentsFilePath, 'utf-8');
        const students = JSON.parse(fileData);
        
        return students;
        
    } catch (error) {
        console.error('Error reading students file:', error);
        return [];
    }
};

const writeStudentsToFile = (students) => {
    try {
        const jsonData = JSON.stringify(students, null, 2);
        fs.writeFileSync(studentsFilePath, jsonData, 'utf-8');
        
        return true;
        
    } catch (error) {
        console.error('Error writing to students file:', error);
        return false;
    }
};

const generateStudentId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const studentId = `STD${timestamp}${randomNum}`;
    
    return studentId;
};

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

app.get('/students', (req, res) => {
    try {
        const students = readStudentsFromFile();
        res.status(200).json(students);
        
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving students',
            error: error.message
        });
    }
});

app.post('/students', (req, res) => {
    try {
        const { fullName, email, phone, department, semester, gender } = req.body;
        
        if (!fullName || !email || !phone || !department || !semester || !gender) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        
        const students = readStudentsFromFile();
        
        const emailExists = students.find(student => student.email === email);
        if (emailExists) {
            return res.status(400).json({
                message: 'Student with this email already exists'
            });
        }
        
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
        
        students.push(newStudent);
        
        const writeSuccess = writeStudentsToFile(students);
        
        if (!writeSuccess) {
            return res.status(500).json({
                message: 'Error saving student data'
            });
        }
        
        res.status(201).json({
            message: 'Student registered successfully',
            student: newStudent
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error registering student',
            error: error.message
        });
    }
});

app.delete('/students/:id', (req, res) => {
    try {
        const studentId = req.params.id;
        let students = readStudentsFromFile();
        
        const studentIndex = students.findIndex(student => student.id === studentId);
        
        if (studentIndex === -1) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        
        const deletedStudent = students.splice(studentIndex, 1);
        
        const writeSuccess = writeStudentsToFile(students);
        
        if (!writeSuccess) {
            return res.status(500).json({
                message: 'Error deleting student'
            });
        }
        
        res.status(200).json({
            message: 'Student deleted successfully',
            student: deletedStudent[0]
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📁 Students data will be stored in: ${studentsFilePath}`);
});
