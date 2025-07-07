const Post = require('../models/Post');

// GET all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category author', 'name');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET single post (by id or slug)
exports.getPostById = async (req, res, next) => {
  try {
    const query = req.params.id.length === 24
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const post = await Post.findOne(query)
      .populate('author', 'name')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// CREATE post
exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// UPDATE post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// DELETE post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
