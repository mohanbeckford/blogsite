const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// CREATING ASSOCITION BETWEEN USER.JS, BLOGPOST.JS AND COMMENTS.JS


BlogPost.associate = models => {
  BlogPost.belongsTo(models.User, {
    foreignKey: 'UserId'
  });

  BlogPost.hasMany(models.Comment, {
    foreignKey: 'BlogPostId',
    onDelete: 'CASCADE'
  });
};


module.exports = BlogPost;
