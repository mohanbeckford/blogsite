const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');


router.get('/signup', (req, res) => {
  res.render('signup');
}); 
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

router.get('/login', (req, res) => {
  res.render('login');
});

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid username or password');
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
};

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
