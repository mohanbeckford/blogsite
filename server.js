const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const authRouter = require('./controllers/authController');
const dashboardRouter = require('../blogsite/controllers/dashboardController');
const blogRouter = require('./controllers/blogController');  

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

// Use the auth and dashboard routers
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

// Use blogRouter for the /blog route
app.use('/blog', blogRouter);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/blogpost/:id', blogRouter);  
