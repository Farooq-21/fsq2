# Complete Execution Guide - Student Management System

## 🎯 Step-by-Step Instructions to Run Your Project

---

## ✅ Prerequisites Check

Before starting, make sure you have:

1. **Node.js installed** (Check by running `node --version` in terminal)
   - If not installed, download from: https://nodejs.org/
   - Install the LTS (Long Term Support) version

2. **VS Code installed** (or any code editor)
   - Download from: https://code.visualstudio.com/

3. **A web browser** (Chrome, Firefox, Edge, etc.)

---

## 📂 Step 1: Open Project in VS Code

### Method 1: Using VS Code
1. Open **Visual Studio Code**
2. Click on **File** → **Open Folder**
3. Navigate to your project folder: `labquiz2`
4. Click **Select Folder**

### Method 2: Using Command Line
1. Open terminal or command prompt
2. Navigate to your project:
   ```bash
   cd C:\Users\Muhammad Farooq\Desktop\labquiz2
   ```
3. Open in VS Code:
   ```bash
   code .
   ```

---

## 🔧 Step 2: Install Backend Dependencies

### Open Terminal in VS Code
1. In VS Code, click **Terminal** → **New Terminal**
2. Or press `` Ctrl + ` `` (backtick key)

### Navigate to Backend Folder
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```

**What this does:**
- Downloads and installs Express.js and CORS packages
- Creates a `node_modules` folder
- These are needed for the server to run

**Expected output:**
```
added 70 packages, and audited 71 packages in 4s
found 0 vulnerabilities
```

---

## 🚀 Step 3: Start the Backend Server

### Make sure you're in the backend folder
```bash
cd backend
```
(If you're already there, skip this)

### Start the server
```bash
npm start
```

**Expected output:**
```
✅ Server is running on http://localhost:3000
📁 Students data will be stored in: C:\Users\Muhammad Farooq\Desktop\labquiz2\backend\students.json
```

**Important Notes:**
- Keep this terminal running! Don't close it.
- If you see errors, check the troubleshooting section below
- The server must be running for the frontend to work

---

## 🌐 Step 4: Open the Frontend

### Option 1: Using Live Server Extension (Recommended)

1. **Install Live Server extension** (if not already installed):
   - Click on Extensions icon in VS Code (or press `Ctrl+Shift+X`)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

2. **Open the frontend:**
   - In VS Code, navigate to `frontend` folder
   - Right-click on `index.html`
   - Select **"Open with Live Server"**
   - Your browser will open automatically

3. **URL will be:** `http://127.0.0.1:5500/frontend/index.html`

### Option 2: Direct Browser Opening

1. Open Windows File Explorer
2. Navigate to: `C:\Users\Muhammad Farooq\Desktop\labquiz2\frontend`
3. Find `index.html`
4. Double-click to open in your default browser

### Option 3: Using Command Line

```bash
# Open a new terminal (don't close the backend terminal)
cd frontend
start index.html
```

---

## 🎨 Step 5: Test the Application

### Test 1: Check Dashboard
- You should see "Total Registered Students: 0"
- Dashboard should be visible at the top

### Test 2: Register a Student

1. Fill in the registration form with sample data:
   - **Full Name:** Ali Ahmed
   - **Email:** ali@example.com
   - **Phone:** 0300-1234567
   - **Department:** Computer Science
   - **Semester:** 5
   - **Gender:** Male

2. Click **"Register Student"** button

3. **Expected result:**
   - Green success message appears at top
   - Form clears automatically
   - Student card appears below
   - Dashboard count updates to 1

### Test 3: Add More Students

Add 2-3 more students with different data to see multiple cards displayed.

### Test 4: Delete a Student

1. Scroll down to see student cards
2. Click **"Delete Student"** button on any card
3. Confirm the deletion in the popup
4. **Expected result:**
   - Student card disappears
   - Dashboard count decreases
   - Success message shows

### Test 5: Verify Data Persistence

1. Close the browser
2. Stop the server (press `Ctrl+C` in backend terminal)
3. Restart the server: `npm start`
4. Open the frontend again
5. **Expected result:** All students should still be there

---

## 🧪 Step 6: Test with Postman (Optional)

Refer to `POSTMAN_TESTING_GUIDE.md` for detailed API testing.

**Quick Test:**
1. Open Postman
2. GET request to: `http://localhost:3000/students`
3. You should see all your registered students in JSON format

---

## 📁 Step 7: Check the JSON File

1. In VS Code, open: `backend/students.json`
2. You should see all student data stored in JSON format
3. This file updates automatically when you add or delete students

**Example content:**
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
  }
]
```

---

## 🔄 Complete Workflow Summary

```
1. Open VS Code
   ↓
2. Open Terminal → cd backend
   ↓
3. npm install (one time only)
   ↓
4. npm start (keep running)
   ↓
5. Open new terminal → cd frontend
   ↓
6. Open index.html in browser
   ↓
7. Test the application
   ↓
8. Ready for demo!
```

---

## ⚠️ Troubleshooting Common Issues

### Issue 1: "npm is not recognized"

**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download Node.js from: https://nodejs.org/
2. Install it
3. Restart VS Code
4. Try again

---

### Issue 2: "Port 3000 is already in use"

**Problem:** Another application is using port 3000

**Solution 1:** Kill the process
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution 2:** Change the port
1. Open `backend/server.js`
2. Change line: `const PORT = 3000;` to `const PORT = 3001;`
3. Open `frontend/script.js`
4. Change line: `const API_URL = 'http://localhost:3000';` to port 3001
5. Restart server

---

### Issue 3: "Cannot GET /"

**Problem:** Backend server is not running

**Solution:**
1. Make sure you ran `npm start` in backend folder
2. Check terminal for errors
3. Make sure port 3000 is available

---

### Issue 4: Students not loading in frontend

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check if backend server is running (look at terminal)
2. Open browser console (F12) and check for errors
3. Make sure `API_URL` in `script.js` is correct
4. Clear browser cache and reload

---

### Issue 5: "Module not found: express"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

---

### Issue 6: Form validation not working

**Problem:** JavaScript file not loaded

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Make sure `script.js` is in the frontend folder
4. Refresh the page

---

### Issue 7: Styling looks broken

**Problem:** CSS file not loaded or Bootstrap CDN issue

**Solution:**
1. Check internet connection (Bootstrap loads from CDN)
2. Make sure `style.css` is in frontend folder
3. Clear browser cache
4. Hard refresh: `Ctrl + F5`

---

## 🎓 For Your Lab Quiz Demo

### Before Starting:

1. ✅ Backend server is running
2. ✅ Frontend opens correctly
3. ✅ You can register a student
4. ✅ You can delete a student
5. ✅ Dashboard count updates
6. ✅ Data persists after refresh

### During Demo:

1. **Show the homepage** - Explain the color theme and layout
2. **Show the registration form** - Point out validation
3. **Register a student** - Show success message
4. **Show the student card** - Explain the display
5. **Delete a student** - Show confirmation
6. **Open students.json** - Show data storage
7. **Restart server and reload** - Show persistence
8. **Open Postman** - Demo API endpoints

### Be Ready to Explain:

- How form validation works
- How frontend communicates with backend
- How data is stored in JSON file
- What each file does (HTML, CSS, JS, server.js)
- Why you used Bootstrap
- What REST API means

---

## 📱 Testing Responsiveness

### Desktop View
1. Open in full-screen browser
2. Student cards show 3 per row

### Tablet View
1. Press `F12` to open Developer Tools
2. Click device toolbar icon (or `Ctrl+Shift+M`)
3. Select "iPad" or set width to 768px
4. Cards should show 2 per row

### Mobile View
1. In Developer Tools
2. Select "iPhone" or set width to 375px
3. Cards should stack (1 per row)
4. Form fields should stack vertically

---

## 🔄 Stopping and Restarting

### To Stop the Server:
1. Go to the terminal running the backend
2. Press `Ctrl + C`
3. Type `Y` if asked to confirm

### To Restart:
```bash
cd backend
npm start
```

### To Close Everything:
1. Stop the backend server (`Ctrl + C`)
2. Close the browser
3. Close VS Code

---

## 💾 Backup Your Work

### Before submitting:

1. **Copy the entire project folder** to a safe location
2. **Test on another computer** if possible
3. **Take screenshots** of working application
4. **Record a video** of the demo (optional but recommended)

---

## 📊 Performance Check

Your application should:
- ✅ Load in less than 2 seconds
- ✅ Register student in less than 1 second
- ✅ Delete student in less than 1 second
- ✅ Update dashboard immediately
- ✅ Show proper error messages
- ✅ Work on mobile, tablet, and desktop

---

## 🎯 Final Checklist

Before submitting or demo:

- [ ] Node.js is installed
- [ ] All files are in correct folders
- [ ] npm install completed successfully
- [ ] Backend server starts without errors
- [ ] Frontend opens in browser
- [ ] Can register new student
- [ ] Can view all students
- [ ] Can delete student
- [ ] Dashboard shows correct count
- [ ] Form validation works
- [ ] Success/error messages appear
- [ ] Design is responsive
- [ ] Data persists after restart
- [ ] Tested with Postman
- [ ] README.md is complete
- [ ] Code is properly commented
- [ ] Git commits are done

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the error message carefully
2. Look in this troubleshooting guide
3. Check browser console (F12)
4. Check terminal for backend errors
5. Try restarting both frontend and backend
6. Clear browser cache

---

**You're all set! Good luck with your lab quiz! 🚀**
