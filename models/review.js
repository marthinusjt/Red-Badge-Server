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
            type: DataTypes.TEXT,
            allowNull: true
        },
        cons:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        textArea:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
    return Review;
}
