// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/Comment');
// const BlogPost = require('../models/BlogPost');
// const blogController = require('../controllers/blogController');

// // View individual post
// router.get('/post/:id', async (req, res) => {
//   const postId = req.params.id;
//   const post = await BlogPost.findByPk(postId);
//   const comments = await Comment.findAll({ where: { post_id: postId } });
//   const comments2 = comments.map((comment) => comment.get({ plain: true }));
//   const post3 = post.get({ plain: true });

//   const pid = postId;
//   res.render('BlogPost', { post3, comments2, postId });
// });

// // Add comment
// router.post('/add-comment', async (req, res) => {
//   const userId = req.session.userId;

//   if (userId !== undefined) {
//     const postId = req.body.postId;
//     const content = req.body.content;
//     const commentsurl = req.body.commentsurl;

//     try {
//       await Comment.create({
//         post_id: postId,
//         content,
//         user: req.session.userName,
//       });

//       req.session.commentsid = postId;
//       req.session.save();

//       res.redirect(commentsurl);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       res.status(500).send('Failed to add a comment: ' + error.message);
//     }
//   } else {
//     // Handle case where userId is undefined
//     res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
//   }
// });

// // Edit post - Render the edit form
// router.get('/edit-post/:id', async (req, res) => {
//   const userId = req.session.userId;
//   if (userId !== undefined) {
//     const postId = req.params.id;
//     const post = await BlogPost.findByPk(postId);

//     if (post) {
//       res.render('edit-post', { post });
     

//     } else {
//       res.status(404).send('Post not found');
//     }
//   } else {
//     // Handle case where userId is undefined
//     res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
//   }
// });

// // Handle the POST request to update the post
// router.post('/edit-post/:id', async (req, res) => {
//   const userId = req.session.userId;
//   if (userId !== undefined) {
//     const postId = req.params.id;
//     const { title, content } = req.body;

//     try {
//       const post = await BlogPost.findByPk(postId);

//       if (post) {
//         post.title = title;
//         post.content = content;
//         await post.save();

//         res.redirect('/dashboard');
//       } else {
//         res.status(404).send('Post not found');
//       }
//     } catch (error) {
//       console.error('Error updating post:', error);
//       res.status(500).send('Failed to update the post: ' + error.message);
//     }
//   } else {
//     // Handle case where userId is undefined
//     res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
//   }
// });

// // Use controller functions for other routes
// router.get('/', blogController.getAllBlogPosts);
// router.get('/post/:id', blogController.getBlogPostById);
// router.post('/add-comment', blogController.addComment);
// router.get('/edit-post/:id', blogController.getEditPost);
// router.post('/edit-post/:id', blogController.updatePost);

// // exports router
// module.exports = router;


const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const blogController = require('../controllers/blogController');

// View individual post
router.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await BlogPost.findByPk(postId);
  const comments = await Comment.findAll({ where: { post_id: postId } });
  const comments2 = comments.map((comment) => comment.get({ plain: true }));
  const post3 = post.get({ plain: true });

  const pid = postId;
  res.render('BlogPost', { post3, comments2, postId });
});

// Add comment
router.post('/add-comment/:id', async (req, res) => {
  const userId = req.session.userId;

  if (userId !== undefined) {
    const postId = req.body.postId;
    const content = req.body.content;
    const commentsurl = req.body.commentsurl;

    try {
      await Comment.create({
        post_id: postId,
        content,
        user: req.session.userName,
      });

      req.session.commentsid = postId;
      req.session.save();

      res.redirect(commentsurl);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Failed to add a comment: ' + error.message);
    }
  } else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Edit post - Render the edit form
router.get('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId;
  if (userId !== undefined) {
    const postId = req.params.id;
    const post = await BlogPost.findByPk(postId);

    if (post) {
      res.render('edit-post', { post });
    } else {
      res.status(404).send('Post not found');
    }
  } else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Handle the POST request to update the post
router.post('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId;
  if (userId !== undefined) {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
      const post = await BlogPost.findByPk(postId);

      if (post) {
        post.title = title;
        post.content = content;
        await post.save();

        res.redirect('/dashboard');
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).send('Failed to update the post: ' + error.message);
    }
  } else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

module.exports = router;

