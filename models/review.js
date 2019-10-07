module.exports= (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        ownerId:{
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        gameId:{
            type: DataTypes.INTEGER,
            // allowNull: false
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        headline:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pros:{
            type: DataTypes.STRING,
            allowNull: true
        },
        cons:{
            type: DataTypes.STRING,
            allowNull: true
        },
        body:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Review;
}
