const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const BlogPost = require('./BlogPost');

class User extends Model {}

// Define the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

// // Define the association with BlogPost
// User.hasMany(BlogPost, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

module.exports = User;
