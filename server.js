// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const sequelize = require('./config/connection');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const handlebars = require('express-handlebars');
// const User = require('./models/User');
// const Comment = require('./models/Comment');

// const app = express();
// const PORT = process.env.PORT || 3006;

// const sess = {
//   secret: 'My$ecr3tSess10nK3yF0rBl0gApp!',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// };

// app.use(session(sess));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/authRoutes'));
// app.use('/posts', require('./routes/blogRoutes'));
// app.use('/dashboard', require('./routes/dashboardRoutes'));


// // Configure Handlebars

// const hbs = handlebars.create({
//   partialsDir: [
//     'views/partials/' 
//   ],
//   helpers: {
//     truncatedContent: function (content) {
//       if (content.length > 200) {
//         return content.substring(0, 200) + '...';
//       }
//       return content;
//     },
//     gt: function (a, b) {
//       return a > b;
//     }
//   }
// });

// hbs.handlebars.registerHelper('gt', function(a, b, options) {
//   return a > b ? options.fn(this) : options.inverse(this);
// });

// hbs.handlebars.registerPartial('footer', '{{> footer}}');
// hbs.handlebars.registerPartial('header', '{{> header}}');


// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));


// app.get('/BlogPost/:id', async (req, res) => {
//   try {
//     const BlogPostId = req.params.id;
//     const BlogPost = await fetchBlogPostByIdFromDatabase(BlogPostId);

//     res.render('BlogPost', { BlogPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.post('/login', (req, res) => { 
//   const userId = getUserIdDuringLogin(req.body.username, req.body.password);

//   // Check if userId is valid (for demonstration purposes, check if it's a number)
//   if (isNaN(userId)) {
//     res.status(400).send('Invalid user credentials.');
//     return;
//   }
//   req.session.userId = userId; 
//   res.redirect('/dashboard'); 
// });



// User.sync()
//   .then(() => {
//     console.log('Users table synced successfully.');
//   })
//   .catch(error => {
//     console.error('Error syncing Users table:', error);
//   });



// Comment.sync()
// .then(() => {
//   console.log('Comments table synced successfully.');
// })
// .catch(error => {
//   console.error('Error syncing Comments table:', error);
// });



// app.get('/dashboard/edit-post/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await fetchBlogPostByIdFromDatabase(postId);

//     if (post) {
//       res.render('editPost', { post });
//     } else {
//       res.status(404).send('Post not found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// // Synchronize models with the database
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('Database synced');
//     startServer();
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

// // Use your routes module for routing
// app.use('/', routes);

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send('Internal Server Error');
// });

// function startServer() {
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// }


const path = require('path');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./routes');
const User = require('./models/User');
const Comment = require('./models/Comment');
// const hbs = exphbs.create({});


const app = express();
const PORT = process.env.PORT || 3006;

const sess = {
  secret: 'My$ecr3tSess10nK3yF0rBl0gApp!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/posts', require('./routes/blogRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));




// Configure Handlebars
const hbs = handlebars.create({
  partialsDir: ['views/partials/'],
  helpers: {
    truncatedContent: function (content) {
      if (content.length > 200) {
        return content.substring(0, 200) + '...';
      }
      return content;
    },
    gt: function (a, b) {
      return a > b;
    },
  },
});

hbs.handlebars.registerHelper('gt', function (a, b, options) {
  return a > b ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerPartial('footer', '{{> footer}}');
hbs.handlebars.registerPartial('header', '{{> header}}');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/BlogPost/:id', async (req, res) => {
  try {
    const BlogPostId = req.params.id;
    const BlogPost = await fetchBlogPostByIdFromDatabase(BlogPostId);

    res.render('BlogPost', { BlogPost });
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

User.sync()
  .then(() => {
    console.log('Users table synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing Users table:', error);
  });

Comment.sync()
  .then(() => {
    console.log('Comments table synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing Comments table:', error);
  });

  
  app.get('/dashboard/edit-post/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await fetchBlogPostByIdFromDatabase(postId);
  
      if (post) {
        res.render('editPost', { post });
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/dashboard/edit-post/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    // Update the post in the database with the new title and content
    const updatedPost = await updatePostInDatabase(postId, title, content);
  
    if (updatedPost) {
      res.redirect('/dashboard'); // Redirect to the dashboard after updating
    } else {
      res.status(500).send('Failed to update the post');
    }
  });
  



// Synchronize models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced');
    startServer();
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Use your routes module for routing
app.use('/', routes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

function startServer() {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

