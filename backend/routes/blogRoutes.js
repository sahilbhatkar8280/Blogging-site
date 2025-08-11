const router = require('express').Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5*1024*1024 } });

// Public: get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).populate('author', 'username name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Public: get single blog by id
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username name');
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Protected: create blog
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'title and content required' });
    const imageUrl = req.file ? '/' + req.file.path.replace(/\\/g, '/') : null;
    const blog = await Blog.create({
      title, content, tags: tags ? tags.split(',').map(t=>t.trim()) : [], published: published === 'false' ? false : true,
      imageUrl, author: req.user._id
    });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Protected: update blog
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    if (String(blog.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    const { title, content, tags, published } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(',').map(t=>t.trim()) : blog.tags;
    blog.published = typeof published !== 'undefined' ? (published === 'false' ? false : true) : blog.published;
    if (req.file) blog.imageUrl = '/' + req.file.path.replace(/\\/g, '/');
    await blog.save();
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Protected: delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    if (String(blog.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await blog.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
