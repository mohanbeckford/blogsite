// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController');

// router.get('/', blogController.getAllBlogPosts);
// router.get('/:id', blogController.getBlogPostById);
// router.post('/:id/comment', blogController.addComment);

// module.exports = router;


// loads required module
const express = require('express');
const router = express.Router();
const Post = require('../models/BlogPost');
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// View individual post
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await BlogPost.findByPk(postId);
  const comments = await Comment.findAll({ where: { post_id: postId } });
  const comments2 = comments.map((comments) =>
  comments.get({ plain: true })
  );
  const posts = await BlogPost.findAll({ where: { id: postId } });
  const post3 = posts.map((posts) =>
  posts.get({ plain: true })
  );

  const pid = postId;
  res.render('post', { post3, comments2, pid });
});

// Add comment
router.post('/add-comment', async (req, res) => {
  const userId = req.session.userId; 
  if (userId !== undefined) {

      const postId = req.body.post_Id;
      const content = req.body.content;
      const commentsurl = req.body.commentsurl;

      try {
      await Comment.create({
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

    }

    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
    }
});
// exports router
module.exports = router;


