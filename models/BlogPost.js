const { Model, DataTypes } = require("sequelize"); 
const sequelize = require("../config/connection");
const User = require('./User');

class BlogPost extends Model {}

BlogPost.init(
  {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    
    content: {
      type: DataTypes.TEXT, 
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "BlogPost",
  }
);



module.exports = BlogPost;


BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE',
  });
};