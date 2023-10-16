
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const BlogPost = require('./BlogPost');

class User extends Model {}

// cretae table user on init
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },

  // {
  //   sequelize,
  //   modelName: 'User',
  // }


);


// Define the association
// User.hasMany(BlogPost, {
//   foreignKey: {
//     name: 'UserId', 
//     allowNull: false
//   },
// });

module.exports = User;
