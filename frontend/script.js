const API_URL = 'http://localhost:3000';

let students = [];

window.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});

const loadStudents = async () => {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        students = data;
        displayStudents();
        updateStudentCount();
    } catch (error) {
        showMessage('Error loading students. Please make sure the server is running.', 'danger');
        console.error('Error:', error);
    }
};

const displayStudents = () => {
    const container = document.getElementById('studentsContainer');
    container.innerHTML = '';
    
    if (students.length === 0) {
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
    
    students.forEach(student => {
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
        
        container.innerHTML += studentCard;
    });
};

const updateStudentCount = () => {
    const countElement = document.getElementById('studentCount');
    countElement.textContent = students.length;
};

const form = document.getElementById('studentForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;
    const gender = document.getElementById('gender').value;
    
    if (!validateForm(fullName, email, phone, department, semester, gender)) {
        return;
    }
    
    const newStudent = {
        fullName: fullName,
        email: email,
        phone: phone,
        department: department,
        semester: semester,
        gender: gender
    };
    
    await registerStudent(newStudent);
});

const validateForm = (fullName, email, phone, department, semester, gender) => {
    if (fullName === '') {
        showMessage('Please enter student full name', 'danger');
        return false;
    }
    
    if (fullName.length < 3) {
        showMessage('Full name must be at least 3 characters long', 'danger');
        return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address', 'danger');
        return false;
    }
    
    const phonePattern = /^03\d{2}-?\d{7}$/;
    if (!phonePattern.test(phone)) {
        showMessage('Please enter a valid phone number (e.g., 03XX-XXXXXXX)', 'danger');
        return false;
    }
    
    if (department === '') {
        showMessage('Please select a department', 'danger');
        return false;
    }
    
    if (semester === '') {
        showMessage('Please select a semester', 'danger');
        return false;
    }
    
    if (gender === '') {
        showMessage('Please select gender', 'danger');
        return false;
    }
    
    return true;
};

const registerStudent = async (student) => {
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Student registered successfully!', 'success');
            form.reset();
            await loadStudents();
        } else {
            showMessage(data.message || 'Failed to register student', 'danger');
        }
        
    } catch (error) {
        showMessage('Error connecting to server. Please try again.', 'danger');
        console.error('Error:', error);
    }
};

const deleteStudent = async (studentId) => {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    
    if (!confirmDelete) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/students/${studentId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Student deleted successfully!', 'success');
            await loadStudents();
        } else {
            showMessage(data.message || 'Failed to delete student', 'danger');
        }
        
    } catch (error) {
        showMessage('Error connecting to server. Please try again.', 'danger');
        console.error('Error:', error);
    }
};

const showMessage = (message, type) => {
    const messageArea = document.getElementById('messageArea');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    messageArea.innerHTML = '';
    messageArea.appendChild(alert);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
};
