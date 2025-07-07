const express = require('express');
const { body, param } = require('express-validator');
const auth   = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const {
  getPosts, getPost, createPost, /* updatePost, deletePost */
} = require('../controllers/postController');

const router = express.Router();

router.get('/',          getPosts);
router.get('/:id', [
  param('id').isMongoId(),
], validate,             getPost);

router.post('/', [
  auth,
  upload.single('featuredImage'),
  body('title').notEmpty().isLength({ max: 100 }),
  body('content').notEmpty(),
  body('category').isMongoId(),
], validate,             createPost);

/* PUT /:id, DELETE /:id … */

module.exports = router;
