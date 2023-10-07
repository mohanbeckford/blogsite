const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {

  // USER REGISTRATION

  signup: async (req, res) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create the user
      const user = await User.create({
        username: req.body.username,
        password: hashedPassword
      });

      // Set session
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // USER LOGIN
  login: async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(400).send('Invalid username or password');
      }

      // Check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).send('Invalid username or password');
      }

      // Set session
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // USER LOGOUT
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/');
    });
  }
};

module.exports = authController;
