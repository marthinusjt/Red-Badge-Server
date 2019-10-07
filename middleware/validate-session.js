const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');
const validateSession = (req, res, next) => {
   if (req.method == 'OPTIONS') { //ALWAYS PLACE THIS HERE IN THE VALIDATE SESSION
       next();
   } else {
       const token = req.headers.authorization
       if (!token) {
           res.status(403).send({ auth: false, message: 'No Token Provided!' })
       } else {
           jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
               if (decoded) {
                   User.findOne({ where: {id: decoded.id} }).then(user => {
                       req.user = user
                       next()
                   },
                   () => {
                       res.status(401).send({ error: 'Not Authorized' });
                   })
               } else {
                   res.status(400).send({ error: 'Authorization NOT Allowed'})
               }
           })
       }
   }
};
module.exports = validateSession