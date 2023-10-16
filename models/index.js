

const BlogPost = require('./BlogPost');
const User = require('./User');
const Comment = require('./Comment');
const sequelize = require('../config/connection');


// Define associations
User.hasMany(BlogPost, { 
foreignKey: 'UserId' });


BlogPost.belongsTo(User, { 
foreignKey: 'UserId' });


Comment.belongsTo(BlogPost, { 
foreignKey: 'BlogPostId' });


User.hasMany(Comment,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
  foreignKey: 'user_id'
});

module.exports = {
  User,
  Comment,
  BlogPost,
};