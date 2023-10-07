const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// CREATING SSOCITION BETWEEN USER.JS, BLOGPOST.JS AND COMMENTS.JS

Comment.associate = models => {
  Comment.belongsTo(models.User, {
    foreignKey: 'UserId'
  });

  Comment.belongsTo(models.BlogPost, {
    foreignKey: 'BlogPostId'
  });
};

module.exports = Comment;