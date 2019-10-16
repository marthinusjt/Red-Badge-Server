
let router = require('express').Router();
let sequelize = require('../db');
let ForumReply = sequelize.import('../models/forumReply');
const validateSession = require('../middleware/validate-session');
// GET ALL forumReplyS BY GAMEID

router.get('/all/:id/:category/:topicId', (req, res) => {
    ForumReply.findAll(

        {where:
            { gameId: req.params.id, category: req.params.category, topicId: req.params.topicId }
        }
            
        )
        .then(forumReply => res.status(200).json(forumReply))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })


router.post('/:gameid/:category/:topicId', validateSession, (req, res) => {
    ForumReply.create({

        ownerId: req.user.id,
        gameId: req.params.gameid,
        userName: req.user.userName,
        category: req.params.category,
        textArea: req.body.textArea,
        topicId: req.params.topicId,
   

})
.then(forumReply => res.status(200).json(forumReply))
.catch(err => res.status(500).json({
    error: err
}))
});

// GET A forumReply BY forumReplyID
router.get('/:gameid/:category/:topicId', validateSession, function(req, res) {
    let userid = req.user.id;
    let gameid = req.params.gameid;
    let category = req.params.category;
    let topicid = req.params.id;
    ForumReply
        .findOne({
           where: { gameId: gameid, ownerId: userid, category: category, topicId: topicid }
       }).then(
           function findOneSuccess(data) {
               res.json(data);
           },
           function findOneError(err) {
               res.send(500, err.message);
           }
       );
});
// DELETE A forumReply
router.delete('/:gameid/:category/:topicId', validateSession, function(req, res) {
    let userid = req.user.id;
    let gameid = req.params.gameid;
    let category = req.params.category
    let topicid = req.params.id;
    ForumReply
       .destroy({
           where: { gameId: gameid, ownerId: userid, category: category, topicId: topicid }
       }).then(
           function deleteLogSuccess(data){
               res.send("you removed a log");
           },
           function deleteLogError(err){
               res.send(500, err.message);
           }
       );
});
// UPDATE A forumReply
router.put('/:gameid/:category/:topicId', validateSession, function(req, res) {
   let userid = req.user.id;
   let gameid = req.params.gameid;
   let category = req.params.category;
   let topicid = req.params.id;
   ForumReply
       .update(req.body,
           {where: { gameId: gameid, ownerId: userid, category: category, topicId: topicid }}
       )
       .then(spieces => res.status(200).json(spieces))
       .catch(err => res.status(500).json({
           error: err
       }))
});
module.exports = router;