const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');
const Comment = require('./models/Comment');
// const bodyParser = require('body-parser');


const app = express();

const PORT = process.env.PORT || 3006


const sess = {
  secret: 'My$ecr3tSess10nK3yF0rBl0gApp!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the fetchBlogPostsFromDatabase function
const fetchBlogPostsFromDatabase = async (blogPostId) => {
  try {
    const blogPost = await BlogPost.findByPk(blogPostId);
    return blogPost;
  } catch (error) {
    console.error('Error fetching blog posts from the database:', error);
    throw error;
  }
};


app.get('/', async (req, res) => {
  try {

    const blogPostId = req.query.blogPostId; 

    // if (!blogPostId) {
    //   // Handle the case where blogPostId is not provided
    //   return res.status(400).send('Bad Request: Blog post ID is missing.');
    // }


    const blogPost = await fetchBlogPostsFromDatabase(blogPostId);
    res.render('home', {blogPost });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



// Synchronize models with the database
BlogPost.sync({ force: false }) 
  .then(() => {
    console.log('BlogPost model synced successfully.');
    return User.sync({ force: false});
    
  })


  .catch(error => {
    console.error('Error syncing BlogPost model:', error);
  });



//INITILIZING HANDLEBARS





const handlebars = require('express-handlebars');
const hbs = handlebars.create({
  partialsDir: [
    'views/partials/' 
  ],
  helpers: {
    truncatedContent: function (content) {
      if (content.length > 200) {
        return content.substring(0, 200) + '...';
      }
      return content;
    },
    gt: function (a, b) {
      return a > b;
    }
  }
});

hbs.handlebars.registerHelper('gt', function(a, b, options) {
  return a > b ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerPartial('footer', '{{> footer}}');
hbs.handlebars.registerPartial('header', '{{> header}}');



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

User.sync()
  .then(() => {
    console.log('Users table synced successfully.');
  })
  .catch(error => {
    console.error('Error syncing Users table:', error);
  });



Comment.sync()
.then(() => {
  console.log('Comments table synced successfully.');
})
.catch(error => {
  console.error('Error syncing Comments table:', error);
});



const fetchBlogPostByIdFromDatabase = async (BlogPostId) => {
  try {
    const BlogPost = await BlogPost.findByPk(BlogPostId);
    return BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by ID from the database:', error);
    throw error;
  }
};



app.get('/blogpost/:id', async (req, res) => {
  try {
    const BlogPostId = req.params.id;
    const BlogPost = await fetchBlogPostByIdFromDatabase(BlogPostId);

    res.render('blogpost', { BlogPost });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/login', (req, res) => { 
  const userId = getUserIdDuringLogin(req.body.username, req.body.password);

  // Check if userId is valid (for demonstration purposes, check if it's a number)
  if (isNaN(userId)) {
    res.status(400).send('Invalid user credentials.');
    return;
  }
  req.session.userId = userId; 
  res.redirect('/dashboard'); 
});


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/posts', require('./routes/blogRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));


//synchronization
if (sequelize) {
  sequelize.sync({ force: false })
    .then(() => {
      console.log('Database synced');
      startServer();
    })
    .catch(error => {
      console.error('Error syncing database:', error);
    });
} else {
  console.error('Sequelize is not defined. Make sure it is properly initialized.');
}
//THIS starts the server after the database synchronization is complete.
function startServer() {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
