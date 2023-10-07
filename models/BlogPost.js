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

module.exports = BlogPost;
