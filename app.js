require('dotenv').config();

const PORT = process.env.PORT || 3344

const express = require('express');
const app = express();
const review = require('./controllers/reviewcontroller');
const user = require('./controllers/usercontroller');
const forumTopic = require('./controllers/forumTopicController');
const forumReply = require('./controllers/forumReplyController');
const admin = require('./controllers/admincontroller');

const sequelize = require('./db');

sequelize.sync();
// sequelize.sync({force: true}); // tip: {force: true} for resetting tables

app.use(express.json());
app.use(require('./middleware/headers')); 

// UNPROTECTED ROUTES
app.use('/auth', user);
app.use('/review', review);
app.use('/forumTopic', forumTopic);
app.use('/forumReply', forumReply);

// PROTECTED ROUTES
app.use(require('./middleware/validate-session'))
app.use('/admin', admin);

app.listen(process.env.PORT, () => console.log(`app is listening port ${process.env.PORT}`))