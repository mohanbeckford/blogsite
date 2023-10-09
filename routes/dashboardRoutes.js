const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getUserBlogPosts); // DISPLAY USER'S BLOGS
router.post('/create', dashboardController.createBlogPost); // CREATE NEW POST
router.post('/:id/update', dashboardController.updateBlogPost); // UPDATE POST
router.post('/:id/delete', dashboardController.deleteBlogPost); // DELETE POST

module.exports = router;
