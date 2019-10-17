module.exports= (sequelize, DataTypes) => {
    const ForumTopic = sequelize.define('forumTopic', {
        pinned:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ownerId:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gameId:{
            type: DataTypes.INTEGER,
            allowNull: true
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category:{
            type: DataTypes.ENUM,
            allowNull: true,
            values:[
                'null',
                'Announcements',
                'GeneralDiscussion'

            ]
        },
        textArea:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        topic:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return ForumTopic;
}
