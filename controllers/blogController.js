const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Route to get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, attributes: ['username'] }]
        },
        { model: User, attributes: ['username'] }
      ]
    });
    res.render('home', { blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get a specific blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, attributes: ['username'] }]
        },
        { model: User, attributes: ['username'] }
      ]
    });
    res.render('blogPost', { blogPost });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a comment to a blog post
router.post('/comment/:id', async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.commentText,
      BlogPostId: req.params.id,
      UserId: req.session.user.id
    });
    res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
