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
