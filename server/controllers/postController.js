const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author category').sort('-createdAt');
    res.json(posts);
  } catch (err) { next(err); }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const featuredImage = req.file ? req.file.filename : undefined;
    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.id,
      featuredImage,
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

/* add updatePost, deletePost similarly */
