
let router = require('express').Router();
let sequelize = require('../db');
let ForumTopic = sequelize.import('../models/forumTopic');
const validateSession = require('../middleware/validate-session');
// GET ALL forumTopicS BY GAMEID

router.get('/all/:id/:category', (req, res) => {
    ForumTopic.findAll(

        {where:
            {gameId: req.params.id, category: req.params.category}
        }
            
        )
        .then(forumTopic => res.status(200).json(forumTopic))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })


router.post('/:gameid/:category', validateSession, (req, res) => {
    ForumTopic.create({

        pinned: false,
        ownerId: req.user.id,
        gameId: req.params.gameid,
        userName: req.user.userName,
        category: req.params.category,
        textArea: req.body.textArea,

        topic: req.body.topic,
        // topicId: req.body.topicId, //moved to forumReply
   

})
.then(forumTopic => res.status(200).json(forumTopic))
.catch(err => res.status(500).json({
    error: err
}))
});

// GET A forumTopic BY forumTopicCategory
router.get('/:gameid/:category', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let category = req.params.category;
   let userid = req.user.id;
   ForumTopic
       .findOne({
           where: { gameId: gameid, ownerId: userid, category: category }
       }).then(
           function findOneSuccess(data) {
               res.json(data);
           },
           function findOneError(err) {
               res.send(500, err.message);
           }
       );
});
// DELETE A forumTopic
router.delete('/:gameid/:category/:id', validateSession, function(req, res) {
   let gameid = req.params.gameid;
   let category = req.params.category;
   let userid = req.user.id;
   let id = req.params.id
   ForumTopic
       .destroy({
           where: { gameId: gameid, ownerId: userid, category: category, id:id }
       }).then(
           function deleteLogSuccess(data){
               res.send("you removed a log");
           },
           function deleteLogError(err){
               res.send(500, err.message);
           }
       );
});
// UPDATE A forumTopic
router.put('/:id', validateSession, function(req, res) {
//    let userid = req.user.id;
//    let gameid = req.params.gameid;
//    let category = req.params.category;
   let id = req.params.id
   ForumTopic
       .update(req.body,
           {where: { /* gameId: gameid, ownerId: userid, category: category,*/ id:id  }}
       )
       .then(spieces => res.status(200).json(spieces))
       .catch(err => res.status(500).json({
           error: err
       }))
});

router.get('/:ownerId', validateSession, function(req, res) {
    let ownerId = req.params.ownerId;

    ForumTopic
        .findAll({
            where: { ownerId: ownerId }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
 });
module.exports = router;