const Category = require('../models/Category');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const category = await Category.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
