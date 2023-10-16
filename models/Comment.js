// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// const Comment = sequelize.define('Comment', {
//   text: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// });


// module.exports = Comment;


// load required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// class comments
class Comment extends Model {}
// on init cretae table
Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

// exports comments
module.exports = Comment;

