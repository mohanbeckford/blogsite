const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

const dashboardController = {
  // Get all blog posts of the logged-in user
  getUserBlogPosts: async (req, res) => {
    try {
      const userBlogPosts = await BlogPost.findAll({
        where: { UserId: req.session.user.id }
      });
      res.render('dashboard', { userBlogPosts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Create a new blog post for the logged-in user
  createBlogPost: async (req, res) => {
    try {
      await BlogPost.create({
        title: req.body.title,
        contents: req.body.contents,
        UserId: req.session.user.id
      });
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Update an existing blog post of the logged-in user
  updateBlogPost: async (req, res) => {
    try {
      await BlogPost.update(
        { title: req.body.title, contents: req.body.contents },
        { where: { id: req.params.id } }
      );
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Delete an existing blog post of the logged-in user
  deleteBlogPost: async (req, res) => {
    try {
      await BlogPost.destroy({ where: { id: req.params.id } });
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = dashboardController;
