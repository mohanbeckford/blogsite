const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userBlogPosts = await BlogPost.findAll({
      where: { UserId: req.session.user.id }
    });
    res.render('dashboard', { userBlogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new blog post for the logged-in user
router.post('/create', async (req, res) => {
  try {
    const { title, contents } = req.body;
    await BlogPost.create({
      title,
      contents,
      UserId: req.session.user.id
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing blog post of the logged-in user
router.post('/update/:id', async (req, res) => {
  try {
    const { title, contents } = req.body;
    await BlogPost.update(
      { title, contents },
      { where: { id: req.params.id } }
    );
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an existing blog post of the logged-in user
router.post('/delete/:id', async (req, res) => {
  try {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
