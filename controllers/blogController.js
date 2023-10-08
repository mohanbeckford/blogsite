const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const User = require('../models/User');

const blogController = {
  // Get all blog posts with associated comments and creators
  getAllBlogPosts: async (req, res) => {
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
  },

  // Get a blog post by id with associated comments and creator
  getBlogPostById: async (req, res) => {
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
  },

  // Add a comment to a blog post
  addComment: async (req, res) => {
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
  }
};

module.exports = blogController;
