# Postman API Testing Guide

## 📌 Prerequisites

1. Download and install Postman from: https://www.postman.com/downloads/
2. Make sure your backend server is running on `http://localhost:3000`

---

## 🧪 Test 1: GET All Students

### Purpose
Retrieve all registered students from the database.

### Setup
1. Open Postman
2. Click on "New" → "HTTP Request"
3. Set the following:

**Method:** `GET`  
**URL:** `http://localhost:3000/students`

### Steps
1. Click the **Send** button
2. Check the response in the bottom panel

### Expected Response

**Status Code:** `200 OK`

**Response Body (if no students):**
```json
[]
```

**Response Body (with students):**
```json
[
  {
    "id": "STD1700747994321456",
    "fullName": "Ali Ahmed",
    "email": "ali@example.com",
    "phone": "0300-1234567",
    "department": "Computer Science",
    "semester": "5",
    "gender": "Male",
    "registeredAt": "11/23/2026, 6:00:00 PM"
  },
  {
    "id": "STD1700748123456789",
    "fullName": "Sara Khan",
    "email": "sara@example.com",
    "phone": "0321-9876543",
    "department": "Software Engineering",
    "semester": "3",
    "gender": "Female",
    "registeredAt": "11/23/2026, 6:05:00 PM"
  }
]
```

---

## 🧪 Test 2: POST - Register New Student

### Purpose
Add a new student to the system.

### Setup
1. Create a new request in Postman
2. Set the following:

**Method:** `POST`  
**URL:** `http://localhost:3000/students`

### Configure Headers
1. Go to the **Headers** tab
2. Add this header:
   - **Key:** `Content-Type`
   - **Value:** `application/json`

### Configure Body
1. Go to the **Body** tab
2. Select **raw**
3. Select **JSON** from the dropdown
4. Enter the following JSON:

```json
{
  "fullName": "Ahmed Hassan",
  "email": "ahmed.hassan@example.com",
  "phone": "0300-1234567",
  "department": "Computer Science",
  "semester": "5",
  "gender": "Male"
}
```

### Steps
1. Click **Send**
2. Check the response

### Expected Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "STD1700747994321456",
    "fullName": "Ahmed Hassan",
    "email": "ahmed.hassan@example.com",
    "phone": "0300-1234567",
    "department": "Computer Science",
    "semester": "5",
    "gender": "Male",
    "registeredAt": "11/23/2026, 6:00:00 PM"
  }
}
```

---

## 🧪 Test 3: POST - Multiple Student Examples

### Example 1: Female Student

```json
{
  "fullName": "Fatima Ali",
  "email": "fatima.ali@example.com",
  "phone": "0321-7654321",
  "department": "Software Engineering",
  "semester": "3",
  "gender": "Female"
}
```

### Example 2: IT Department Student

```json
{
  "fullName": "Usman Tariq",
  "email": "usman.tariq@example.com",
  "phone": "0333-9988776",
  "department": "Information Technology",
  "semester": "7",
  "gender": "Male"
}
```

### Example 3: Data Science Student

```json
{
  "fullName": "Ayesha Khan",
  "email": "ayesha.khan@example.com",
  "phone": "0345-1122334",
  "department": "Data Science",
  "semester": "4",
  "gender": "Female"
}
```

---

## 🧪 Test 4: POST - Validation Tests

### Test 4a: Missing Field (Should Fail)

**Body:**
```json
{
  "fullName": "Ali Ahmed",
  "email": "ali@example.com",
  "department": "Computer Science",
  "semester": "5",
  "gender": "Male"
}
```

**Expected Response:**

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "message": "All fields are required"
}
```

---

### Test 4b: Duplicate Email (Should Fail)

First, register a student with email `test@example.com`, then try to register another student with the same email.

**Expected Response:**

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "message": "Student with this email already exists"
}
```

---

## 🧪 Test 5: DELETE - Delete Student by ID

### Purpose
Remove a student from the system.

### Prerequisites
First, run the GET request to find a student ID.

### Setup
1. Create a new request
2. Set the following:

**Method:** `DELETE`  
**URL:** `http://localhost:3000/students/STD1700747994321456`

(Replace `STD1700747994321456` with an actual student ID from your system)

### Steps
1. Click **Send**
2. Check the response

### Expected Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Student deleted successfully",
  "student": {
    "id": "STD1700747994321456",
    "fullName": "Ali Ahmed",
    "email": "ali@example.com",
    "phone": "0300-1234567",
    "department": "Computer Science",
    "semester": "5",
    "gender": "Male",
    "registeredAt": "11/23/2026, 6:00:00 PM"
  }
}
```

---

## 🧪 Test 6: DELETE - Invalid ID (Should Fail)

### Setup

**Method:** `DELETE`  
**URL:** `http://localhost:3000/students/INVALID_ID_12345`

### Expected Response

**Status Code:** `404 Not Found`

**Response Body:**
```json
{
  "message": "Student not found"
}
```

---

## 🧪 Test 7: Root Endpoint

### Purpose
Check if the API is working and see available endpoints.

### Setup

**Method:** `GET`  
**URL:** `http://localhost:3000/`

### Expected Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Welcome to Student Management System API",
  "endpoints": {
    "getStudents": "GET /students",
    "addStudent": "POST /students",
    "deleteStudent": "DELETE /students/:id"
  }
}
```

---

## 📋 Complete Testing Workflow

### Step-by-Step Testing Process

1. **Start the server**
   ```bash
   cd backend
   npm start
   ```

2. **Test 1: Check if API is running**
   - GET `http://localhost:3000/`
   - Should return welcome message

3. **Test 2: Check empty database**
   - GET `http://localhost:3000/students`
   - Should return empty array `[]`

4. **Test 3: Add first student**
   - POST `http://localhost:3000/students`
   - Use JSON body from Test 2
   - Should return 201 with student data

5. **Test 4: Verify student was added**
   - GET `http://localhost:3000/students`
   - Should return array with 1 student

6. **Test 5: Add more students**
   - POST with different student data
   - Add 3-4 more students

7. **Test 6: Verify all students**
   - GET `http://localhost:3000/students`
   - Should return array with all students

8. **Test 7: Test duplicate email**
   - POST with an email that already exists
   - Should return 400 error

9. **Test 8: Delete a student**
   - Copy an ID from GET response
   - DELETE `http://localhost:3000/students/{id}`
   - Should return 200 with deleted student

10. **Test 9: Verify deletion**
    - GET `http://localhost:3000/students`
    - Deleted student should not appear

11. **Test 10: Try to delete non-existent student**
    - DELETE with invalid ID
    - Should return 404 error

---

## 🎨 Postman Collection (Optional)

You can save all these requests as a collection:

1. Click on **Collections** in the left sidebar
2. Click **New Collection**
3. Name it "Student Management System API"
4. Add all your requests to this collection
5. You can export and share this collection

---

## 🔍 HTTP Status Codes Reference

| Code | Meaning | When it appears in our project |
|------|---------|-------------------------------|
| 200 | OK | Successful GET or DELETE |
| 201 | Created | Student registered successfully |
| 400 | Bad Request | Validation failed or missing fields |
| 404 | Not Found | Student ID doesn't exist |
| 500 | Server Error | Something went wrong on the server |

---

## ✅ Verification Checklist

After testing, verify:

- [ ] GET returns empty array initially
- [ ] POST adds student successfully
- [ ] POST validates all required fields
- [ ] POST prevents duplicate emails
- [ ] GET returns all students after adding
- [ ] DELETE removes student correctly
- [ ] DELETE fails with invalid ID
- [ ] Data persists after server restart
- [ ] All responses have correct status codes
- [ ] All responses are in JSON format

---

## 🐛 Common Issues and Solutions

### Issue 1: "Could not get response"
**Solution:** Make sure your backend server is running. Check terminal for errors.

### Issue 2: "CORS error"
**Solution:** Already handled in backend with `cors` middleware.

### Issue 3: "Cannot POST / Cannot DELETE"
**Solution:** Check if the URL is correct. It should be `localhost:3000` not `127.0.0.1`.

### Issue 4: "Unexpected token in JSON"
**Solution:** Make sure your JSON in the body is valid. Check for missing commas or quotes.

---

## 📸 Screenshots of Expected Results

### Successful POST Request
```
Status: 201 Created
Time: ~50ms
Size: 234 B

Response Body shows the newly created student object
```

### Successful GET Request
```
Status: 200 OK
Time: ~20ms
Size: 1.2 KB

Response Body shows array of all students
```

### Successful DELETE Request
```
Status: 200 OK
Time: ~30ms
Size: 189 B

Response Body shows the deleted student object
```

---

## 🎯 For Your Viva

**If instructor asks:** "Show me how you tested your API."

**You say:** "Sir, I used Postman to test all three endpoints. First, I tested GET to retrieve students, then POST to add new students with proper JSON data in the body, and finally DELETE to remove a student using their ID in the URL. I verified that all endpoints return correct status codes and proper JSON responses."

**Be ready to:**
- Open Postman and demonstrate live
- Show the JSON file updating after POST and DELETE
- Explain what each status code means
- Show validation working (duplicate email, missing fields)

---

**Good luck with your testing! 🚀**
