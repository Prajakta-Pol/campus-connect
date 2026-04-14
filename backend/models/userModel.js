const pool = require('../config/db');

const createUser = async (user) => {
  const query = `
    INSERT INTO users (full_name, usn, email, password,confirmPassword, phone, year, role)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    user.fullName,
    user.usn,
    user.email,
    user.password,
    user.confirmPassword,
    user.phone,
    user.year,
    user.role || 'student',
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUser = async (identifier) => {
  const query = `
    SELECT * FROM users WHERE usn=$1 OR email=$1
  `;
  const result = await pool.query(query, [identifier]);
  return result.rows[0];
};

module.exports = { createUser, findUser };