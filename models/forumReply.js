module.exports= (sequelize, DataTypes) => {
    const ForumReply = sequelize.define('forumReply', {
        ownerId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gameId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category:{
            type: DataTypes.ENUM,
            allowNull: false,
            values:[
                'Announcements',
                'GeneralDiscussion'

            ]
        },
        textArea:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        topicId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    return ForumReply;
}
