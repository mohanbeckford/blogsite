
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
    //checking user password with bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//user model, table, object
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
        },
      
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
       
    },
    {
        
        hooks: {
    
            async beforeCreate(newUserData) {
                //encrypt password user passed in
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    10
                );
                return newUserData;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;

