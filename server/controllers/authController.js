const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); // If using express-validator

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Input validation (example, use express-validator in routes for better practice)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ token: genToken(user._id) });
  } catch (err) { next(err); }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    const ok = user && await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: genToken(user._id) });
  } catch (err) { next(err); }
};

// GET users already added (see Part A)
exports.getAllUsers = async (_, res, next) => { /* ... */ };
