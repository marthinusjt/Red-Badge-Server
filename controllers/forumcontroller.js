
let router = require('express').Router();
let sequelize = require('../db');
let Forum = sequelize.import('../models/forum');
const validateSession = require('../middleware/validate-session');
// GET ALL forumS BY GAMEID

router.get('/all/:id', (req, res) => {
    Forum.findAll(

        {where:
            {gameId: req.params.id, }
        }
            
        )
        .then(forum => res.status(200).json(forum))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })


router.post('/:gameid',validateSession, (req, res) => {
    Forum.create({

        pinned: false,
        ownerId: req.user.id,
        gameId: req.params.gameid,
        userName: req.body.userName,
        category: req.body.category,
        textArea: req.body.textArea,

        topic: req.body.topic,
        topicId: req.body.topicId,
   

})
.then(forum => res.status(200).json(forum))
.catch(err => res.status(500).json({
    error: err
}))
});

// GET A forum BY forumID
router.get('/:gameid', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let userid = req.user.id;
   Forum
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
// DELETE A forum
router.delete('/:gameid', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let userid = req.user.id;
   Forum
       .destroy({
           where: { gameId: gameid, ownerId: userid }
       }).then(
           function deleteLogSuccess(data){
               res.send("you removed a log");
           },
           function deleteLogError(err){
               res.send(500, err.message);
           }
       );
});
// UPDATE A forum
router.put('/:gameid', validateSession, function(req, res) {
   let userid = req.user.id;
   let gameid = req.params.gameid;
   Forum
       .update(req.body,
           {where: {gameId: gameid, ownerId: userid}}
       )
       .then(spieces => res.status(200).json(spieces))
       .catch(err => res.status(500).json({
           error: err
       }))
});
module.exports = router;