const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Our Routes! Where do you want to go :) lol
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/blog', require('./routes/blogRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
