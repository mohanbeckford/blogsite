const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Display homepage with blog posts
router.get('/', blogController.getAllBlogPosts);

module.exports = router;
