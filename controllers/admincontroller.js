
let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


router.post('/admin/login', validateSession, function(req, res) {
    User.findOne( { where: { 
        email: req.body.email, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        userName: req.body.userName, 
        

    } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.password, bcrypt.hashSync(user.password, 10), function(err, matches){
                    if (matches) {
                
                        res.json({
                            user: user.admin
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


router.put('/admin/delete', validateSession, function(req, res) {
    User.update(req.body,
        {where: {id: req.body.id}}
    )
    .then(spieces => res.status(200).json(spieces))
    .catch(err => res.status(500).json({
        error: err
    }))
});

router.get('/admin/all/', validateSession, (req, res) => {
    User.findAll(  
        )
        .then(forum => res.status(200).json(forum))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })

 router.delete('/admin/:id', validateSession, function(req, res) {
    let id = req.params.id;

    User
        .destroy({
            where: {id: id }
        }).then(
            function deleteLogSuccess(data){
                res.send(["you removed a log"]);
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
 });




module.exports = router;