const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// User signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      res.render('signup', { error: 'Username already exists' });
    } else {
      await User.create({
        username,
        password: hashedPassword
      });

      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.userName = username;
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.userName = username;
    });

    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
};

router.get('/logout', logout);

module.exports = router;
