let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let ReviewModel = sequelize.import('../models/review');
const validateSession = require('../middleware/validate-session');
// GET ALL REVIEWS BY GAMEID

router.get('/all/:id',validateSession, (req, res) => {
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
        body: req.body.body,

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
           where: { gameid: gameid, ownerid: userid }
       }).then(
           function deleteLogSuccess(data){
               res.send("you removed a log");
           },
           function deleteLogError(err){
               res.send(500, err.message);
           }
       );
});
// UPDATE A REVIEW
router.put('/', validateSession, function(req, res) {
   let userid = req.user.id;
   let review = req.body.review;
   let gameid = req.body.review.gameid;
   let score = req.body.review.score;
   let title = req.body.review.title;
   let body = req.body.review.body;
   ReviewModel
       .update({
           review: review,
           score: score,
           title: title,
           body: body
       },
           {where: {gameid: gameid, ownerid: userid}}
       ).then(
           function updateSuccess(updatedReview) {
               res.json({
                   review: review
               });
           },
           function updateError(err){
               res.send(500, err.message);
           }
       )
});
module.exports = router;