


const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const models = require('./models');
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const dashboardController = require('./controllers/dashboardController');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers: {} });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));




// Using individual controller functions as middleware
app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);
app.get('/auth/logout', authController.logout);

app.use('/blog/getAllBlogPosts', blogController.getAllBlogPosts);
app.use('/blog/getBlogPostById', blogController.getBlogPostById);
app.use('/blog/addComment', blogController.addComment);

app.use('/dashboard/getUserBlogPosts', dashboardController.getUserBlogPosts);
app.use('/dashboard/createBlogPost', dashboardController.createBlogPost);
app.use('/dashboard/updateBlogPost', dashboardController.updateBlogPost);
app.use('/dashboard/deleteBlogPost', dashboardController.deleteBlogPost);



sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.render('home');
});


app.get('/blogpost/:id', blogController.getBlogPostById);


