# Student Management System

A complete full-stack web application for managing student records. Built with HTML5, CSS3, Bootstrap 5, JavaScript ES6+, Node.js, Express.js, and JSON file storage.

## 🎨 Color Theme

- **White** - Main background and content areas
- **Black** - Main text and headings
- **Dark Maroon** (#800020) - Primary buttons and highlights
- **Charcoal** (#36454F) - Navigation bar and secondary sections

## 📋 Features

- ✅ Professional and responsive user interface
- ✅ Student registration with validation
- ✅ Display all registered students
- ✅ Delete student functionality
- ✅ Dashboard showing total student count
- ✅ Success and error messages
- ✅ REST API backend
- ✅ JSON file storage
- ✅ Mobile-friendly design

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES6+

### Backend
- Node.js
- Express.js
- File System (fs)
- CORS

## 📁 Project Structure

```
student-management-system/
│
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Custom CSS styles
│   └── script.js           # JavaScript functionality
│
├── backend/
│   ├── server.js           # Express REST API
│   ├── students.json       # Student data storage
│   └── package.json        # Node.js dependencies
│
└── README.md               # Project documentation
```

## 🚀 Installation and Setup

### Prerequisites

Make sure you have Node.js installed on your computer.
You can download it from: https://nodejs.org/

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click on **File** → **Open Folder**
3. Select the `labquiz2` folder

### Step 2: Install Backend Dependencies

1. Open VS Code terminal: **Terminal** → **New Terminal**
2. Navigate to backend folder:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Step 3: Start the Backend Server

While in the backend folder, run:
```
npm start
```

You should see:
```
✅ Server is running on http://localhost:3000
📁 Students data will be stored in: ...
```

**Important:** Keep this terminal running. Don't close it.

### Step 4: Open the Frontend

1. Open a new terminal in VS Code
2. Navigate to frontend folder:
   ```
   cd frontend
   ```
3. Open `index.html` in your browser:
   - **Option 1:** Right-click on `index.html` and select "Open with Live Server" (if you have Live Server extension)
   - **Option 2:** Double-click on `index.html` file to open in your default browser
   - **Option 3:** Drag `index.html` into your browser

## 📝 How to Use the Application

### Register a Student

1. Fill in all required fields in the registration form
2. Click "Register Student" button
3. Student will be added to the list below

### View All Students

- All registered students are displayed as cards below the form
- Each card shows student details

### Delete a Student

1. Click the "Delete Student" button on any student card
2. Confirm the deletion
3. Student will be removed from the list

### Dashboard

- The dashboard at the top shows the total number of registered students
- It updates automatically when you add or delete students

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Get All Students
- **Method:** GET
- **Endpoint:** `/students`
- **Description:** Retrieve all registered students
- **Response:** Array of student objects

### 2. Register New Student
- **Method:** POST
- **Endpoint:** `/students`
- **Description:** Register a new student
- **Request Body:**
```json
{
  "fullName": "Ali Ahmed",
  "email": "ali@example.com",
  "phone": "0300-1234567",
  "department": "Computer Science",
  "semester": "5",
  "gender": "Male"
}
```
- **Response:**
```json
{
  "message": "Student registered successfully",
  "student": { ... }
}
```

### 3. Delete Student
- **Method:** DELETE
- **Endpoint:** `/students/:id`
- **Description:** Delete a student by ID
- **Example:** `/students/STD1700747994321456`
- **Response:**
```json
{
  "message": "Student deleted successfully",
  "student": { ... }
}
```

## 🧪 Testing with Postman

### 1. GET All Students

1. Open Postman
2. Set method to **GET**
3. Enter URL: `http://localhost:3000/students`
4. Click **Send**
5. You should see all students in JSON format

### 2. POST New Student

1. Set method to **POST**
2. Enter URL: `http://localhost:3000/students`
3. Go to **Body** tab
4. Select **raw** and **JSON**
5. Enter:
```json
{
  "fullName": "Sara Khan",
  "email": "sara@example.com",
  "phone": "0321-9876543",
  "department": "Software Engineering",
  "semester": "3",
  "gender": "Female"
}
```
6. Click **Send**

### 3. DELETE Student

1. First, GET all students to find a student ID
2. Set method to **DELETE**
3. Enter URL: `http://localhost:3000/students/STD1700747994321456`
   (Replace with actual ID)
4. Click **Send**

## 📦 Git Commands

### Initialize Git Repository

```bash
git init
```

### Stage All Files

```bash
git add .
```

### Commit Changes

```bash
# First commit
git commit -m "Initial commit: Create project structure and frontend layout"

# Second commit (after adding form and validation)
git commit -m "Add student registration form and JavaScript validation"

# Third commit (after adding backend)
git commit -m "Implement Express REST API and JSON file storage"

# Fourth commit (after integration)
git commit -m "Integrate frontend with backend and complete student management system"
```

### Connect to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git
git branch -M main
git push -u origin main
```

## ⚠️ Common Issues and Solutions

### Issue 1: "Cannot GET /"
**Solution:** Make sure the backend server is running. Run `npm start` in the backend folder.

### Issue 2: "CORS Error"
**Solution:** The backend already has CORS enabled. Make sure you're running the backend on port 3000.

### Issue 3: "Students not loading"
**Solution:** 
1. Check if backend server is running
2. Check browser console for errors (F12)
3. Make sure the API_URL in `script.js` is correct

### Issue 4: "Module not found"
**Solution:** Run `npm install` in the backend folder to install dependencies.

## 📚 JavaScript Concepts Used

- Variables (let, const)
- Arrays and array methods (push, splice, find, findIndex, forEach)
- Functions and arrow functions
- DOM manipulation
- Event listeners
- Async/await
- Fetch API
- Template literals
- Object destructuring
- Form validation
- Error handling (try-catch)

## 🎓 Developed By

BS Computer Science Student - 5th Semester
Full Stack Development Lab Quiz

## 📄 License

This project is for educational purposes.
