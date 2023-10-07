const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Comment;
