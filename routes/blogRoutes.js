const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogPosts);
router.get('/:id', blogController.getBlogPostById);
router.post('/:id/comment', blogController.addComment);

module.exports = router;

