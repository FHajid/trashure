// dbInit.js
// Function to create the users table if it doesn't exist
async function createUsersTable(pool) {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'driver', 'admin') NOT NULL,
      saldo DECIMAL(10, 2) DEFAULT 0,
      alamat TEXT,
      telepon VARCHAR(15),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    const [result] = await pool.query(query);
    console.log('Users table created or already exists.');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
}

module.exports = { createUsersTable };