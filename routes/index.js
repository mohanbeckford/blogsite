// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController');

// // Display homepage with blog posts
// router.get('/', blogController.getAllBlogPosts);






// loads required modules
const express = require('express');
const router = express.Router();
const Post = require('../models/BlogPost');
const blogController = require('../controllers/blogController');

router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  const postsWithTruncatedContent = posts.map(post => {
    const truncatedContent = post.content.substring(0, 25);
    return {
      ...post.get({ plain: true }),
      truncatedContent,
    };
  });
  res.render('home', { blogPosts: postsWithTruncatedContent });

  
});

module.exports = router;