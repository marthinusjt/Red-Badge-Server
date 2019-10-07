module.exports= (sequelize, DataTypes) => {
    const Forum = sequelize.define('user', {
        pinned:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
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
               ' General Discussions'

            ]
        },
        body:{
            type: DataTypes.STRING,
            allowNull: true
        },
        topic:{
            type: DataTypes.STRING,
            allowNull: false
        },
        topicId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    return Forum;
}
