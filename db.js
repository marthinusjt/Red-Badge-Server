const Sequelize = require('sequelize');

// LOCAL HOST
const sequelize = new Sequelize(process.env.NAME, process.env.USER, process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
})

// HEROKU
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres'
// })

sequelize.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err))

module.exports = sequelize