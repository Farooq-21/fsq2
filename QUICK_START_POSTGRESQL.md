# Quick Start - PostgreSQL Version

## 🚀 Fast Setup Guide for PostgreSQL Version

---

## 📋 What You Need

1. ✅ Node.js installed
2. ✅ PostgreSQL installed
3. ✅ VS Code

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Install PostgreSQL

**Download:** https://www.postgresql.org/download/windows/

During installation:
- Set password (e.g., `postgres` or `admin123`)
- Remember this password!
- Keep port as `5432`

---

### Step 2: Create Database

**Option A: Using pgAdmin 4** (Easiest)

1. Open pgAdmin 4 (installed with PostgreSQL)
2. Connect to server (enter your password)
3. Right-click "Databases" → Create → Database
4. Name: `student_management`
5. Click Save

**Option B: Using Command Line**

```bash
psql -U postgres
CREATE DATABASE student_management;
\q
```

---

### Step 3: Update Password in Code

1. Open `backend/server.js`
2. Find this line:
```javascript
password: 'your_password',
```
3. Change to your actual password:
```javascript
password: 'postgres',  // or whatever password you set
```
4. Save the file

---

### Step 4: Install and Start

```bash
# Install dependencies
cd backend
npm install

# Start server
npm start
```

**Expected output:**
```
✅ Database table initialized successfully
✅ Server is running on http://localhost:3000
🐘 Connected to PostgreSQL database
```

---

### Step 5: Open Frontend

Open `frontend/index.html` in your browser and test!

---

## 🎯 That's It!

Your app now uses PostgreSQL instead of JSON files!

---

## 🔍 Verify It's Working

### Check Database:

1. Open pgAdmin 4
2. Navigate to: student_management → Schemas → public → Tables
3. Right-click `students` → View/Edit Data → All Rows
4. Register a student in your app
5. Refresh the view - you'll see the student in PostgreSQL!

---

## 🆘 Troubleshooting

### "password authentication failed"
→ Update password in `server.js` with your actual PostgreSQL password

### "database does not exist"
→ Create database using pgAdmin 4 or psql command

### "connection refused"
→ Make sure PostgreSQL service is running (check Windows Services)

---

## 📚 More Details

For comprehensive setup instructions, see:
- **POSTGRESQL_SETUP.md** - Detailed setup guide
- **README.md** - Complete documentation

---

**You're now using a professional database! 🐘🚀**
