require('dotenv').config();

const PORT = process.env.PORT || 3344

const express = require('express');
const app = express();
const review = require('./controllers/reviewcontroller');
const user = require('./controllers/usercontroller');
const forum = require('./controllers/forumcontroller');
const admin = require('./controllers/admincontroller');

const sequelize = require('./db');

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers')); 


app.use('/auth', user);

app.use(require('./middleware/validate-session'))


app.use('/review', review);
app.use('/forum', forum);
app.use('/admin', admin);


app.listen(process.env.PORT, () => console.log(`app is listening port ${process.env.PORT}`))
