
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
        admin: false,
        banned: false,
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

router.put('/admin/delete', function(req, res) {
    User.update(req.body,
        {where: {id: req.body.id}}
    )
    .then(spieces => res.status(200).json(spieces))
    .catch(err => res.status(500).json({
        error: err
    }))
});

router.get('/admin/all/', (req, res) => {
    User.findAll(  
        )
        .then(forum => res.status(200).json(forum))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })

module.exports = router;