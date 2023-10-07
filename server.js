const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

// This loads environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// This block of code set Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// This is the express session middleware block of code
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
