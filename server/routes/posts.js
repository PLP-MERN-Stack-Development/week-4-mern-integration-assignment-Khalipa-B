const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../middleware/upload');
const protect = require('../middleware/auth');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes
router.post('/', protect, upload.single('featuredImage'), postController.createPost);
router.put('/:id', protect, upload.single('featuredImage'), postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;



