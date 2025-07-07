const User = require('../models/User');

exports.getAllUsers = async (_, res, next) => {
  try {
    const users = await User.find().select('_id name email');
    res.json(users);
  } catch (err) { next(err); }
};
