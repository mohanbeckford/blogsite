const sequelize = require('../config/connection');
const BlogPost = require('../models/BlogPost');
const blogPostData = require('./blogpost-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  console.log('Database seeded with blog posts successfully.');
  process.exit(0);
};

seedDatabase();
