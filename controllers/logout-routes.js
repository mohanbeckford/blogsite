const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("logout", {
        loggedIn: false,
        loggedInUserData: req.session.loggedInUserData,
    });
});

module.exports = router;
