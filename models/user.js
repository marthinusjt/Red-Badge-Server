module.exports= (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName:{
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: true
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    })
    return User;
}
