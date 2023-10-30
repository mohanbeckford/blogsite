const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Middleware for authentication
const checkAuth = (req, res, next) => {
  if (req.session.userId !== undefined) {
    next();
  } else {
    res.status(403).send('<center><br><br><font size="5">Please, go back and log in first! <br><br> <a href="/">Go Back</a></font></center>');
  }
};

// Route to get all blog posts for the home page and dashboard
router.get(['/', '/dashboard'], async (req, res) => {
  try {
    const userId = req.session.userId; // Store the user ID from the session

    if (userId !== undefined) {
      const posts = await BlogPost.findAll({
        where: {
          user_id: userId, 
        },
      });
      const posts2 = posts.map((post) => post.get({ plain: true }));
      console.log(posts2);

      const view = req.originalUrl.includes('dashboard') ? 'dashboard' : '/';

      res.render(view, { posts2 });
    } else {
      res.status(403).send('<center><br><br><font size="5">Please, go back and log in first! <br><br> <a href="/">Go Back</a></font></center>');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create new post
router.get('/createpost', checkAuth, (req, res) => {
  res.render('createpost');
});

router.post('/createpost', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  const { title, content } = req.body;

  const user = await User.findByPk(userId);

  if (user) {
    await BlogPost.create({
      title,
      content,
      user_id: userId, 
      username: req.session.userName
    });

    res.redirect('/dashboard');
  } else {
    res.status(403).send('<center><br><br><font size="5">User does not exist. Please, go back and log in again. <br><br> <a href="/">Go Back</a></font></center>');
  }
});



router.get('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId; 
  if (userId !== undefined) {
    const postId = req.params.id;
    const posts = await BlogPost.findAll({ where: { id: postId } });
    const posts2 = posts.map((posts) =>
        posts.get({ plain: true })
      );

    res.render('edit-post', { posts2 });
    
    //SAVE EDITS
    router.post('/edit-post/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    const post = await BlogPost.findByPk(postId);
    post.title = title;
    post.content = content;
    await post.save();

    res.redirect('/dashboard');
    });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
  }
  });



// Edit post
// router.get('/edit-post/:id', checkAuth, async (req, res) => {
//   const postId = req.params.id;
//   const post = await BlogPost.findByPk(postId);
//   // const post2 = post.get({ plain: true });
//   res.render('edit-post', { post });

//   console.log(post.title);
// console.log(post.content);
// });






// router.post('/edit-post/:id', checkAuth, async (req, res) => {
//   const postId = req.params.id;
//   const { title, content } = req.body;

//   const post = await BlogPost.findByPk(postId);

//   if (post) {
//     post.title = title;
//     post.content = content;
//     await post.save();

//     res.redirect('/dashboard');
//   } else {
//     // Handle the case where the post is not found
//     res.status(404).send('Post not found');
//   }
//   console.log(post.title);
// console.log(post.content);
// });

router.post('/edit-post/:id', checkAuth, async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await BlogPost.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



// router.post('/edit-post/:id', checkAuth, async (req, res) => {
//   const postId = req.params.id;
//   const { title, content } = req.body;

//   const post = await BlogPost.findByPk(postId);
//   post.title = title;
//   post.content = content;
//   await post.save();

//   res.redirect('/dashboard');
// });

// Delete post
router.get('/delete-post/:id', checkAuth, async (req, res) => {
  const postId = req.params.id;
  const post = await BlogPost.findByPk(postId);
  await post.destroy();

  res.redirect('/dashboard');
});

// Add a comment to a post (requires authentication)
router.post('/add-comment/:postId', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  const postId = parseInt(req.params.postId, 10);
  const content = req.body.content;

  if (!isNaN(postId) && postId > 0) {
    // Check if postId is a valid positive integer
    try {
      await Comment.create({
        content,
        postId, 
        user_id: req.session.user.id,
      });

      res.redirect(`/posts/view/${postId}`);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // Handle the case where postId is not a valid integer
    res.status(400).send('Invalid post ID');
  }
});


// Delete a comment (requires authentication)
router.get('/delete/:commentId', checkAuth, async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.session.userId;
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    return res.redirect('/'); // Handle if the comment doesn't exist
  }

  await comment.destroy();
  res.redirect('/');
});

// Add comment
router.post('/add-comment/:id', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  const postId = req.body.postId;
  const content = req.body.content;
  const commentsurl = req.body.commentsurl;

  if (!postId || !content) {
    return res.status(400).send('Invalid input data'); 

   
  }
  
  try {
    const comment = await Comment.create({
      post_id: postId,
      content,
      user: req.session.userName
    });

    req.session.commentsid = postId;
    req.session.save(() => {
      req.session.commentsid = postId;
    });

    res.redirect(commentsurl);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Error adding comment.');
  }
});


// View individual post
router.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await BlogPost.findByPk(postId);
  const comments = await Comment.findAll({ where: { post_id: postId } });
  const comments2 = comments.map((comment) => 
  comment.get({ plain: true }));
  // const post2 = post.get({ plain: true })
  

  const post2 = await BlogPost.findByPk(postId);
  const posts = await BlogPost.findAll({ where: { id: postId } });
  const post3 = posts.map((posts) =>
  posts.get({ plain: true })
  );

  res.render('comments', { post3, comments2 });
});

module.exports = router;
