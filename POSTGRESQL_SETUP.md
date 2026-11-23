# PostgreSQL Setup Guide

## 🐘 Student Management System with PostgreSQL

Your project has been upgraded to use PostgreSQL database instead of JSON file storage!

---

## 📋 Prerequisites

You need to install PostgreSQL on your computer.

### Download PostgreSQL

**Windows:**
1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer (recommended: latest version)
3. Run the installer

**During Installation:**
- Set a password for the `postgres` user (remember this!)
- Default port: 5432 (keep this)
- Install pgAdmin 4 (GUI tool for managing database)

---

## 🔧 Step 1: Install PostgreSQL

### Installation Steps:

1. **Run the installer**
2. **Components to install:**
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4
   - ✅ Command Line Tools
   - ✅ Stack Builder (optional)

3. **Set password:**
   - You'll be asked to set a password for the `postgres` superuser
   - **Remember this password!** You'll need it later
   - Example: `admin123` or `postgres`

4. **Port:** Keep default `5432`

5. **Locale:** Keep default

6. **Finish installation**

---

## 🗄️ Step 2: Create Database

### Option A: Using pgAdmin 4 (Graphical Interface)

1. **Open pgAdmin 4**
   - Find it in Start Menu
   - Enter your master password (you'll set this on first launch)

2. **Connect to PostgreSQL Server:**
   - In left panel, expand "Servers"
   - Click on "PostgreSQL 15" (or your version)
   - Enter the password you set during installation

3. **Create Database:**
   - Right-click on "Databases"
   - Select "Create" → "Database"
   - Database name: `student_management`
   - Owner: `postgres`
   - Click "Save"

4. **Done!** The database is created

### Option B: Using Command Line (psql)

1. **Open Command Prompt or PowerShell**

2. **Connect to PostgreSQL:**
```bash
psql -U postgres
```
Enter your password when prompted.

3. **Create Database:**
```sql
CREATE DATABASE student_management;
```

4. **Verify:**
```sql
\l
```
You should see `student_management` in the list.

5. **Exit:**
```sql
\q
```

---

## ⚙️ Step 3: Configure Backend

1. **Open `backend/server.js`**

2. **Find this section:**
```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: 'your_password',
    port: 5432,
});
```

3. **Update the password:**
   - Replace `'your_password'` with your actual PostgreSQL password
   - Example: `password: 'admin123'`

4. **Save the file**

---

## 📦 Step 4: Install Dependencies

Open terminal in your backend folder:

```bash
cd backend
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-origin support
- `pg` - PostgreSQL client for Node.js

---

## 🚀 Step 5: Start the Server

```bash
npm start
```

**Expected output:**
```
✅ Database table initialized successfully
✅ Server is running on http://localhost:3000
🐘 Connected to PostgreSQL database
```

**Note:** The first time you start the server, it will automatically create the `students` table in your database!

---

## 🔍 Step 6: Verify Database Table

### Using pgAdmin 4:

1. Open pgAdmin 4
2. Navigate to: Servers → PostgreSQL → Databases → student_management → Schemas → public → Tables
3. You should see the `students` table
4. Right-click on `students` → View/Edit Data → All Rows
5. Currently empty (no students yet)

### Using Command Line:

```bash
psql -U postgres -d student_management
```

Then run:
```sql
\dt
```
You should see the `students` table.

To view the table structure:
```sql
\d students
```

---

## 🧪 Step 7: Test Your Application

1. **Start Backend:**
```bash
cd backend
npm start
```

2. **Open Frontend:**
   - Open `frontend/index.html` in browser
   - Or use Live Server in VS Code

3. **Register a Student:**
   - Fill in the form
   - Click "Register Student"
   - Student data is now saved in PostgreSQL!

4. **Check Database:**
   - Open pgAdmin 4
   - View the `students` table
   - You'll see the student record

---

## 📊 Database Table Structure

The `students` table has these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (auto-increment) | Primary key |
| `student_id` | VARCHAR(50) | Unique student ID (STD...) |
| `full_name` | VARCHAR(100) | Student's full name |
| `email` | VARCHAR(100) | Email address (unique) |
| `phone` | VARCHAR(20) | Phone number |
| `department` | VARCHAR(100) | Department name |
| `semester` | VARCHAR(10) | Semester number |
| `gender` | VARCHAR(20) | Gender |
| `registered_at` | TIMESTAMP | Registration timestamp |

---

## 🔧 Useful PostgreSQL Commands

### Connect to Database:
```bash
psql -U postgres -d student_management
```

### View All Students:
```sql
SELECT * FROM students;
```

### Count Students:
```sql
SELECT COUNT(*) FROM students;
```

### Delete All Students:
```sql
DELETE FROM students;
```

### Drop Table (careful!):
```sql
DROP TABLE students;
```

### Exit psql:
```sql
\q
```

---

## ✅ Benefits of Using PostgreSQL

1. **Professional Database** - Industry-standard, used by major companies
2. **Better Performance** - Handles large amounts of data efficiently
3. **Data Integrity** - ACID compliance ensures data consistency
4. **Advanced Features** - Transactions, constraints, indexes
5. **Scalability** - Can handle millions of records
6. **Security** - Built-in authentication and encryption
7. **Concurrent Access** - Multiple users can access simultaneously
8. **Backup & Recovery** - Built-in tools for data protection

---

## 🆘 Troubleshooting

### Issue 1: "password authentication failed"

**Solution:** Check your password in `server.js`:
```javascript
password: 'your_actual_password'
```

---

### Issue 2: "database does not exist"

**Solution:** Create the database:
```sql
CREATE DATABASE student_management;
```

---

### Issue 3: "connection refused"

**Solution:** 
1. Make sure PostgreSQL service is running
2. Open Services (Windows + R → `services.msc`)
3. Find "postgresql-x64-15" (or your version)
4. Right-click → Start

---

### Issue 4: "port 5432 is already in use"

**Solution:** PostgreSQL might already be running on another port. Check your installation settings.

---

### Issue 5: "could not connect to server"

**Solution:**
1. Verify PostgreSQL is installed
2. Check if service is running
3. Verify port 5432 is correct
4. Check firewall settings

---

## 🎓 For Your Viva

**Q: Why did you use PostgreSQL?**

**A:** "I used PostgreSQL because it's a professional, industry-standard relational database management system. It provides better data integrity with ACID compliance, handles concurrent access efficiently, and scales well for large applications. It also demonstrates knowledge of SQL and database management, which are essential skills in full-stack development."

**Q: What's the difference between JSON file and PostgreSQL?**

**A:** "JSON file storage is simple but has limitations - it's not suitable for concurrent access, lacks data integrity constraints, and can't handle large amounts of data efficiently. PostgreSQL provides structured data storage with relationships, ensures data consistency, supports transactions, and offers better performance and security."

**Q: Show me the database table structure.**

**A:** "I can show it using pgAdmin 4 or by running `\d students` in psql. The table has columns for student ID, full name, email, phone, department, semester, gender, and registration timestamp. Email is unique to prevent duplicates, and ID is auto-incrementing."

---

## 🎯 Testing with Postman

All your previous Postman tests still work the same way! The API endpoints haven't changed:

- GET `http://localhost:3000/students`
- POST `http://localhost:3000/students`
- DELETE `http://localhost:3000/students/STD123...`

The only difference is data is now stored in PostgreSQL instead of JSON file.

---

## 📝 Quick Setup Checklist

- [ ] PostgreSQL installed
- [ ] Password set and remembered
- [ ] pgAdmin 4 installed
- [ ] Database `student_management` created
- [ ] Password updated in `server.js`
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors
- [ ] Table automatically created
- [ ] Can register students
- [ ] Can view students in database
- [ ] Can delete students
- [ ] Frontend works correctly

---

**Your Student Management System is now powered by PostgreSQL! 🐘🚀**
