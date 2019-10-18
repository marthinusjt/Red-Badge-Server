
let router = require('express').Router();
let sequelize = require('../db');

let ReviewModel = sequelize.import('../models/review');
const validateSession = require('../middleware/validate-session');
// GET ALL REVIEWS BY GAMEID

router.get('/all/:id', (req, res) => {
    ReviewModel.findAll(

        {where:
            {gameId: req.params.id, }
        }
            
        )
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })


router.post('/',validateSession, (req, res) => {
    ReviewModel.create({


        ownerId: req.user.id,
        gameId: req.body.gameId,
        userName: req.body.userName,
        score: req.body.score,
        headline: req.body.headline,
        pros: req.body.pros,
        cons: req.body.cons,
        textArea: req.body.textArea,

})
.then(review => res.status(200).json(review))
.catch(err => res.status(500).json({
    error: err
}))
});

// GET A REVIEW BY REVIEWID
router.get('/:gameid', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let userid = req.user.id;
   ReviewModel
       .findOne({
           where: { gameId: gameid, ownerId: userid }
       }).then(
           function findOneSuccess(data) {
               res.json(data);
           },
           function findOneError(err) {
               res.send(500, err.message);
           }
       );
});
// DELETE A REVIEW
router.delete('/:gameid', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let userid = req.user.id;
   ReviewModel
       .destroy({
           where: { gameId: gameid, ownerId: userid }
       }).then(
           function deleteLogSuccess(data){
               res.send(["you removed a log"]);
           },
           function deleteLogError(err){
               res.send(500, err.message);
           }
       );
});
// UPDATE A REVIEW
router.put('/:gameid', validateSession, function(req, res) {
   let userid = req.user.id;
   let gameid = req.params.gameid;
   ReviewModel
       .update(req.body,
           {where: {gameId: gameid, ownerId: userid}}
       )
       .then(spieces => res.status(200).json(spieces))
       .catch(err => res.status(500).json({
           error: err
       }))
});

router.get('/admin/:id', (req, res) => {
    ReviewModel.findAll(

        {where:
            {ownerId: req.params.id, }
        }
            
        )
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })

 router.delete('/admin/:id', validateSession, function(req, res) {

    ReviewModel
        .destroy({
            where: { id: req.params.id }
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