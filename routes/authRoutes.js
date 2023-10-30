
const authController = require('../controllers/authController');


// loads required module
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

const handleErrors = (res, message, statusCode = 500) => {
  console.error(message);
  res.status(statusCode).send(message);
};

// Signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// User signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    } 
    const user = await User.create({
      username,
      password: hashedPassword
    });
    return res.redirect('/auth/login');
  } catch (error) {
    handleErrors(res, 'Error creating user:', 500);
  }
});

//---------------------
    
//     else {
//       const user = await User.create({
//         username,
//         password: hashedPassword
//       });
//       res.redirect('/auth/login');
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
 
// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //MOHAN
  try {
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      req.session.userName = username;
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.userName = username;
      });
      return res.redirect('/dashboard');
    } else {
      return res.render('login', { error: 'Invalid credentials' });
    }
  } catch (error) {
    handleErrors(res, 'Error during login:', 500);
  }
});


// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('<center><br><br><font size="5">You are logged out ! <br><br> <a href="/">Go Home</a></font></center>');
 
});


// exports router
module.exports = router;


