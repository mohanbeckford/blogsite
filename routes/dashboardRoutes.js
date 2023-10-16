
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const User = require('../models/User');




const fetchBlogPostsFromDatabase = async () => {
  try {
    // Fetch blog posts logic here
    const blogPosts = await BlogPost.findAll();
    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts from the database:', error);
    throw error;
  }
};

const createBlogPost = async (title, content, userId) => {
  try {
    const newBlogPost = await BlogPost.create({
      title,
      content,
      user: username,
      UserId: userId,
    });
    return newBlogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Dashboard page
router.get('/', async (req, res) => {
  try {
    // Fetch blog posts
    const blogPosts = await fetchBlogPostsFromDatabase();
    res.render('dashboard', { blogPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Create new post
// Define the GET route for displaying the create post form
router.get('/createpost', (req, res) => {
  const userId = req.session.userId;
  if (userId !== undefined) {
    // Render the create post form view
    res.render('createpost'); 
  }
  else {
     // Handle case where userId is undefined
     res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
  }
});



router.post('/createpost', async (req, res) => {
  const userId = req.session.userId;
  const { title, content } = req.body;

  if (userId !== undefined) {
    try {
      // Create a new blog post with the user_id set
      await BlogPost.create({
        title,
        content,
        UserId: userId,  
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).send('Error creating blog post');
    }
  } else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});








// Edit post

router.get('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId; 
  if (userId !== undefined) {
    const postId = req.params.id;
    try {
      const post = await BlogPost.findByPk(postId);
      res.render('edit-post', { post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
  }
});



// Delete post

router.get('/delete-post/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await BlogPost.destroy({
      where: {
        id: postId
      }
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).send('Error deleting blog post');
  }
});





// Add a comment to a post
router.post('/add-comment/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    // Create a new comment
    await createComment(postId, content);
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Error adding comment');
  }
});

// Delete a comment
router.get('/delete-comment/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  await deleteComment(commentId);
  res.redirect('/');
});

module.exports = {
  fetchBlogPostsFromDatabase,
  createBlogPost,
 
};

module.exports = router;


