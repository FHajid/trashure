const express = require('express');
const mysql = require('mysql2/promise');
const { createUsersTable } = require('./config/dbInit'); // Import the function

const app = express();
const port = 3001;

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'trashure', // Replace with your database name
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Middleware to parse JSON bodies
app.use(express.json());

// Example route to fetch data from the database
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Example route to insert data into the database
app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (nama, email, telepon, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, password]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log('User  registered:', result);
      // Redirect or show success message
    } else {
      console.error(new Error('Registration failed'));
    }
  } catch (error) {
    console.error(new Error('Error:', error));
  }
});

// Start the server
app.listen(port, async () => {
  await createUsersTable(pool); // Ensure the users table exists
  console.log(`Server is running on http://localhost:${port}`);
});