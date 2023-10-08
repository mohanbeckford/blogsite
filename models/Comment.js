const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Comment.associate = models => {
  Comment.belongsTo(models.User, {
    foreignKey: 'UserId'
  });

  Comment.belongsTo(models.BlogPost, {
    foreignKey: 'BlogPostId',
    onDelete: 'CASCADE'
  });
};

module.exports = Comment;
