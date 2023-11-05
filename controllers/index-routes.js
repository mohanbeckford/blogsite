const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//on / (index) page load
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            //joins table
            include: [
                {
                    model: User,
                    attributes: ["id", "username"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        const packagedPosts = [];
        let currentPackage = [];
        for (let i = 0; i < posts.length; i++) {
            if (i == 0) {
                currentPackage.push(posts[i]);
                packagedPosts.push(currentPackage);
                currentPackage = [];
            } else {
                currentPackage.push(posts[i]);
            }
            
            if (i % 2 == 0 || posts.length - i <= 1) {
                if (currentPackage.length != 0) {
                    packagedPosts.push(currentPackage);
                }
                currentPackage = [];
            }
        }
        
        res.render("index", {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts: packagedPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
