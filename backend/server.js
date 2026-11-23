const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: 'your_password',
    port: 5432,
});

const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                student_id VARCHAR(50) UNIQUE NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                department VARCHAR(100) NOT NULL,
                semester VARCHAR(10) NOT NULL,
                gender VARCHAR(20) NOT NULL,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Database table initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

initializeDatabase();

const generateStudentId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `STD${timestamp}${randomNum}`;
};

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Student Management System API',
        database: 'PostgreSQL',
        endpoints: {
            getStudents: 'GET /students',
            addStudent: 'POST /students',
            deleteStudent: 'DELETE /students/:id'
        }
    });
});

app.get('/students', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT student_id as id, full_name as "fullName", email, phone, department, semester, gender, registered_at as "registeredAt" FROM students ORDER BY id DESC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving students',
            error: error.message
        });
    }
});

app.post('/students', async (req, res) => {
    try {
        const { fullName, email, phone, department, semester, gender } = req.body;
        
        if (!fullName || !email || !phone || !department || !semester || !gender) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        
        const emailCheck = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({
                message: 'Student with this email already exists'
            });
        }
        
        const studentId = generateStudentId();
        
        const result = await pool.query(
            'INSERT INTO students (student_id, full_name, email, phone, department, semester, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING student_id as id, full_name as "fullName", email, phone, department, semester, gender, registered_at as "registeredAt"',
            [studentId, fullName, email, phone, department, semester, gender]
        );
        
        res.status(201).json({
            message: 'Student registered successfully',
            student: result.rows[0]
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error registering student',
            error: error.message
        });
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        
        const result = await pool.query(
            'DELETE FROM students WHERE student_id = $1 RETURNING student_id as id, full_name as "fullName", email, phone, department, semester, gender, registered_at as "registeredAt"',
            [studentId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        
        res.status(200).json({
            message: 'Student deleted successfully',
            student: result.rows[0]
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
    console.log(`🐘 Connected to PostgreSQL database`);
});
