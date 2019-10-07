// const router = require('express').Router();
// const User = require('../db').import('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')


// router.post('/signup', (req, res) => {
//     User.create({


//         firstName: req.body.firstName,
//         lastName: req.body.lastNameme,
//         userName: req.body.userName,
//         email: req.body.email,
//         admin: false,



    
//     password: bcrypt.hashSync(req.body.password, 10)
// })
// .then(
//     createSuccess = (user) => {
//         let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
//         res.json({
//             user: user,
//             message: 'user created',
//             sessionToken: token
//         });
//     },
//     createError = (error) => {res.status(500).send({ error: 'failed to authenticate' })
// }
// )
// });


// router.post('/signin', (req, res) =>{
//     User.findOne({
//         where: {
//             userName: req.body.userName
//         }
//     })
//     .then(user => {
//         if(user){
//             bcrypt.compare(req.body.password, user.password, (err, matches) => {
//                 if(matches){
//                     let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
//                     res.json({
//                         user: user,
//                         message: 'successfully authenticated user',
//                         sessionToken: token
//                     })
//                 } else {
//                     res.status(502).send({ error: 'bad gateway' })
//                 }
//             })
//         } else {
//             res.status(500).send({ error: 'failed to authenticate' })
//         }
//     },  err => res.status(501).send({ error: 'failed to process'}))
//  })


//  router.delete('/:id', (req, res) =>{
//     User.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(user => res.status(200).json(user))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
//  })

 

//  router.put('/:id', (req, res) => {
//     User.update(req.body, { 
//         where: { 
//             id: req.params.id }})
//       .then(user => res.status(200).json(user))
//       .catch(err => res.status(500).json({ error: err}))
//   })

//  module.exports = router;

// let express = require('express');
let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
router.post('/signup', function(req, res) {
    let pass = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    User.create({
        firstName: firstName,
        lastName: lastName,
        userName: req.body.userName,
        email: email,
        password: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

router.post('/login', function(req, res) {
    User.findOne( { where: { email: req.body.email } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, matches){
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "Login authenticated successfully.",
                            sessionToken: token
                        });
                    }else {
                        res.status(502).send({ error: "502 error" });
                    }
                });
            } else {
                res.status(500).send({ error: "Login failed to authenticate." });
            }
        },
        function(err) {
            res.status(501).send({ error: "501 error" });
        }
    );
});

module.exports = router;