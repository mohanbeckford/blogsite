const Sequelize = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./User');


// class BlogPost extends Model {}

const BlogPost = sequelize.define(
  "BlogPost",
  {
    // Define your attributes here
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

   UserId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: User, 
    key: 'id'    
  },
},


    // username: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "BlogPost",
  }
);

// User.hasMany(BlogPost, {
//   foreignKey: 'UserId',
//   onDelete: 'CASCADE',
// });

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE',
  });
};

module.exports = BlogPost;