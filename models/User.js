const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// CREATING SSOCITION BETWEEN USER.JS, BLOGPOST.JS AND COMMENTS.JS

User.associate = models => {
  User.hasMany(models.BlogPost, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE'
  });

  User.hasMany(models.Comment, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE'
  });
};

module.exports = User;
