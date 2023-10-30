const express = require('express');
const router = express.Router();
const Post = require('../models/BlogPost');

// Display homepage with blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    const postsWithTruncatedContent = posts.map(post => {
      const truncatedContent = post.content.substring(0, 25);
      return {
        ...post.get({ plain: true }),
        truncatedContent,
      };
    });
    res.render('home', { blogPosts: postsWithTruncatedContent });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).send('Oops! Something went wrong while fetching blog posts.');
  }
});

module.exports = router;
