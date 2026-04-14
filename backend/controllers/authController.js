const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";

// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const {
      full_name,
      usn,
      email,
      password,
      phone,
      department,
      current_year,
      role
    } = req.body;

    // 🔒 Restrict email
    if (!email.endsWith("@college.edu")) {
      return res.status(400).json({ message: "Use college email only" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
      (full_name, usn, email, password, phone, department, current_year, role)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [full_name, usn, email, hashedPassword, phone, department, current_year, role || 'student']
    );

    res.status(201).json({ message: "User created", user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // identifier = email OR usn
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 OR usn=$1",
      [identifier]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};