// ========================================
// Global Variables
// ========================================

// Backend API URL - Change this if your server runs on a different port
const API_URL = 'http://localhost:3000';

// Array to store all students
let students = [];

// ========================================
// Load Students When Page Opens
// ========================================

// This function runs automatically when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});

// ========================================
// Load All Students from Backend
// ========================================

// This function fetches all students from the server
const loadStudents = async () => {
    try {
        // Send GET request to fetch all students
        const response = await fetch(`${API_URL}/students`);
        
        // Convert response to JSON format
        const data = await response.json();
        
        // Store students in the global array
        students = data;
        
        // Display students on the page
        displayStudents();
        
        // Update the dashboard count
        updateStudentCount();
        
    } catch (error) {
        // Show error message if something goes wrong
        showMessage('Error loading students. Please make sure the server is running.', 'danger');
        console.error('Error:', error);
    }
};

// ========================================
// Display Students on Page
// ========================================

// This function creates cards for each student and displays them
const displayStudents = () => {
    // Get the container where students will be displayed
    const container = document.getElementById('studentsContainer');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Check if there are any students
    if (students.length === 0) {
        // Show empty state message
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <h4>No Students Registered Yet</h4>
                    <p>Use the registration form above to add students</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Loop through each student and create a card
    students.forEach(student => {
        // Create HTML for student card using template literals
        const studentCard = `
            <div class="col-md-6 col-lg-4">
                <div class="student-card">
                    <h5>${student.fullName}</h5>
                    <p><strong>ID:</strong> ${student.id}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Phone:</strong> ${student.phone}</p>
                    <p><strong>Department:</strong> ${student.department}</p>
                    <p><strong>Semester:</strong> ${student.semester}</p>
                    <p><strong>Gender:</strong> ${student.gender}</p>
                    <button class="btn btn-delete" onclick="deleteStudent('${student.id}')">
                        Delete Student
                    </button>
                </div>
            </div>
        `;
        
        // Add the card to the container
        container.innerHTML += studentCard;
    });
};

// ========================================
// Update Student Count on Dashboard
// ========================================

// This function updates the total number of students displayed
const updateStudentCount = () => {
    const countElement = document.getElementById('studentCount');
    countElement.textContent = students.length;
};

// ========================================
// Form Submission Handler
// ========================================

// Get the form element
const form = document.getElementById('studentForm');

// Add event listener for form submission
form.addEventListener('submit', async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;
    const gender = document.getElementById('gender').value;
    
    // Validate form data
    if (!validateForm(fullName, email, phone, department, semester, gender)) {
        return; // Stop if validation fails
    }
    
    // Create student object
    const newStudent = {
        fullName: fullName,
        email: email,
        phone: phone,
        department: department,
        semester: semester,
        gender: gender
    };
    
    // Send data to backend
    await registerStudent(newStudent);
});

// ========================================
// Form Validation Function
// ========================================

// This function validates all form fields
const validateForm = (fullName, email, phone, department, semester, gender) => {
    // Check if full name is empty
    if (fullName === '') {
        showMessage('Please enter student full name', 'danger');
        return false;
    }
    
    // Check if full name has at least 3 characters
    if (fullName.length < 3) {
        showMessage('Full name must be at least 3 characters long', 'danger');
        return false;
    }
    
    // Validate email format using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address', 'danger');
        return false;
    }
    
    // Validate phone number (Pakistani format: 03XX-XXXXXXX or 11 digits)
    const phonePattern = /^03\d{2}-?\d{7}$/;
    if (!phonePattern.test(phone)) {
        showMessage('Please enter a valid phone number (e.g., 03XX-XXXXXXX)', 'danger');
        return false;
    }
    
    // Check if department is selected
    if (department === '') {
        showMessage('Please select a department', 'danger');
        return false;
    }
    
    // Check if semester is selected
    if (semester === '') {
        showMessage('Please select a semester', 'danger');
        return false;
    }
    
    // Check if gender is selected
    if (gender === '') {
        showMessage('Please select gender', 'danger');
        return false;
    }
    
    // All validations passed
    return true;
};

// ========================================
// Register New Student
// ========================================

// This function sends student data to the backend
const registerStudent = async (student) => {
    try {
        // Send POST request to register student
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        
        // Get response data
        const data = await response.json();
        
        // Check if registration was successful
        if (response.ok) {
            // Show success message
            showMessage('Student registered successfully!', 'success');
            
            // Clear the form
            form.reset();
            
            // Reload students to show the new student
            await loadStudents();
        } else {
            // Show error message from server
            showMessage(data.message || 'Failed to register student', 'danger');
        }
        
    } catch (error) {
        // Show error message if request fails
        showMessage('Error connecting to server. Please try again.', 'danger');
        console.error('Error:', error);
    }
};

// ========================================
// Delete Student Function
// ========================================

// This function deletes a student by ID
const deleteStudent = async (studentId) => {
    // Ask for confirmation before deleting
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    
    // If user cancels, stop the function
    if (!confirmDelete) {
        return;
    }
    
    try {
        // Send DELETE request to backend
        const response = await fetch(`${API_URL}/students/${studentId}`, {
            method: 'DELETE'
        });
        
        // Get response data
        const data = await response.json();
        
        // Check if deletion was successful
        if (response.ok) {
            // Show success message
            showMessage('Student deleted successfully!', 'success');
            
            // Reload students to update the list
            await loadStudents();
        } else {
            // Show error message
            showMessage(data.message || 'Failed to delete student', 'danger');
        }
        
    } catch (error) {
        // Show error message if request fails
        showMessage('Error connecting to server. Please try again.', 'danger');
        console.error('Error:', error);
    }
};

// ========================================
// Show Success/Error Messages
// ========================================

// This function displays messages to the user
const showMessage = (message, type) => {
    // Get message area
    const messageArea = document.getElementById('messageArea');
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Clear previous messages
    messageArea.innerHTML = '';
    
    // Add new message
    messageArea.appendChild(alert);
    
    // Scroll to top to show the message
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
};
