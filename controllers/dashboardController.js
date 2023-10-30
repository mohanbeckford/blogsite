const express = require('express');
const router = express.Router();
const Post = require('../models/BlogPost');
const Comment = require('../models/Comment');

// Dashboard page
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;

    if (userId !== undefined) {
      const posts = await Post.findAll({
        where: {
          user_id: userId, // Use the correct column name for user_id
        },
      });

      const posts2 = posts.map((post) => post.get({ plain: true }));

      res.render('dashboard', { posts2 });
    } else {
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create new post - Render the create post form
router.get('/createpost', (req, res) => {
  const userId = req.session.userId;
  if (userId !== undefined) {
    res.render('createpost');
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Create new post - Handle the POST request
router.post('/createpost', async (req, res) => {
  const userId = req.session.userId;
  const { title, content } = req.body;

  if (userId !== undefined) {
    await Post.create({
      title,
      content,
      user_id: userId, // Use the correct column name for user_id
      username: req.session.userName,
    });

    res.redirect('/dashboard');
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Edit post - Render the edit form
router.get('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId;
  if (userId !== undefined) {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (post) {
      const postPlain = post.get({ plain: true });
      res.render('edit-post', { postPlain });
    } else {
      res.status(404).send('<center><br><br><font size="5">Post not found! <br><br> <a href="/dashboard">Go Back</a></font></center>');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Edit post - Handle the POST request to update the post
router.post('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.id;
  const { title, content } = req.body;

  if (userId !== undefined) {
    const post = await Post.findByPk(postId);

    if (post) {
      post.title = title;
      post.content = content;
      await post.save();

      res.redirect('/dashboard');
    } else {
      res.status(404).send('<center><br><br><font size="5">Post not found! <br><br> <a href="/dashboard">Go Back</a></font></center>');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Delete post
router.get('/delete-post/:id', async (req, res) => {
  const userId = req.session.userId;

  if (userId !== undefined) {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (post) {
      await post.destroy();
      res.redirect('/dashboard');
    } else {
      res.status(404).send('<center><br><br><font size="5">Post not found! <br><br> <a href="/dashboard">Go Back</a></font></center>');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Add a comment to a post (requires authentication)
router.post('/add-comment/:postId', async (req, res) => {
  const userId = req.session.userId;
  const postId = req.params.postId;
  const content = req.body.content;

  if (userId !== undefined) {
    if (!isNaN(postId) && postId > 0) {
      try {
        await Comment.create({
          content,
          post_id: postId,
          user_id: userId,
        });

        res.redirect(`/posts/view/${postId}`);
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(400).send('<center><br><br><font size="5">Invalid post ID. Please provide a valid post ID. <br><br> <a href="/">Go Back</a></font></center>');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and log in first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// Delete a comment (requires authentication)
router.get('/delete-comment/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.session.userId;

  if (userId !== undefined) {
    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.redirect('/');
    } else {
      res.status(404).send('<center><br><br><font size="5">Comment not found! <br><br> <a href="/">Go Back</a></font></center>');
    }
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first! <br><br> <a href="/">Go Back</a></font></center>');
  }
});

// View individual post
router.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (post) {
    const comments = await Comment.findAll({ where: { post_id: postId } });
    const comments2 = comments.map((comment) => comment.get({ plain: true }));

    const postPlain = post.get({ plain: true });

    res.render('comments', { postPlain, comments2 });
  } else {
    res.status(404).send('<center><br><br><font size="5">Post not found! <br><br> <a href="/dashboard">Go Back</a></font></center>');
  }
});

module.exports = router;
