const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

// GET /api/categories - get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// POST /api/categories - create new category
router.post(
  '/',
  body('name').notEmpty().withMessage('Name is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const existing = await Category.findOne({ name: req.body.name });
      if (existing) return res.status(400).json({ message: 'Category already exists' });

      const category = new Category({ name: req.body.name });
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
