// const BlogPost = require('../models/BlogPost');
// const Comment = require('../models/Comment');
// const User = require('../models/User');
// // const BlogPost = require('../models/BlogPost');


// // Function to fetch all blog posts
// const getAllBlogPosts = async (req, res) => {
//   try {
//     const blogPosts = await BlogPost.findAll({
//       include: [
//         {
//           model: Comment,
//           as: 'comment',
//           include: [{ model: User, attributes: ['username'] }],
//         },
//         { model: User, attributes: ['username'] },
//       ],
//     });
//     res.render('home', { blogPosts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };


// // Function to fetch a specific blog post by ID from the database
// const fetchBlogPostByIdFromDatabase = async (postId) => {
//   try {
//     const blogPost = await BlogPost.findByPk(postId, {
//       include: [
//         // Include associations if needed
//       ],
//     });
//     return blogPost;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error fetching blog post');
//   }
// };


// // Function to get a specific blog post by ID
// const getBlogPostById = async (req, res) => {
//   try {
//     const blogPost = await BlogPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           as: 'comment',
//           include: [{ model: User, attributes: ['username'] }],
//         },
//         { model: User, attributes: ['username'] },
//       ],
//     });
//     res.render('blogPost', { blogPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// // Function to add a comment to a blog post
// const addComment = async (req, res) => {
//   try {
//     const comment = await Comment.create({
//       text: req.body.commentText,
//       BlogPostId: req.params.id,
//       UserId: req.session.user.id,
//     });
//     res.redirect(`/blog/${req.params.id}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = {
//   getAllBlogPosts,
//   getBlogPostById,
//   addComment,
// };


const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Function to fetch all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: Comment,
          as: 'comment', 
          include: [{ model: User, attributes: ['username'] }],
        },
        { model: User, attributes: ['username'] },
      ],
    });
    res.render('home', { blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to fetch a specific blog post by ID from the database
const fetchBlogPostByIdFromDatabase = async (postId) => {
  try {
    const blogPost = await BlogPost.findByPk(postId, {
      include: [
        {
          model: Comment,
          as: 'comment', 
          include: [{ model: User, attributes: ['username'] }],
        },
        { model: User, attributes: ['username'] },
      ],
    });
    return blogPost;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching blog post');
  }
};

// Function to get a specific blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await fetchBlogPostByIdFromDatabase(req.params.id);
    res.render('blogPost', { blogPost });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to add a comment to a blog post
const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.content,
      BlogPostId: req.params.id,
      UserId: req.session.user.id, 
    });
    res.redirect(`/dashboard/post/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



// Function to get the edit form for a post
const getEditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await BlogPost.findByPk(postId);

    if (post) {
      res.render('edit-post', { post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error getting the edit form:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update a post
const updatePost = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (userId !== undefined) {
      const postId = req.params.id;
      const { title, content } = req.body;

      const post = await BlogPost.findByPk(postId);

      if (post) {
        post.title = title;
        post.content = content;
        await post.save();

        res.redirect('/dashboard');
      } else {
        res.status(404).send('Post not found');
      }
    } else {
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Failed to update the post: ' + error.message);
  }
};




module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  addComment,
  getEditPost,
  updatePost,
};
