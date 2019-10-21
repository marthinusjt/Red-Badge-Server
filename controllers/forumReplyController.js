
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
        userName: req.user.userName,
        gameId: req.params.gameid,
        category: req.params.category,
        topicId: req.params.topicId,
        textArea: req.body.textArea,
   
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
router.delete('/:id', validateSession, function(req, res) {

    ForumReply
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

// UPDATE A forumReply
router.put('/:gameid/:category/:topicId/:id', validateSession, function(req, res) {
   let userid = req.user.id;
   let gameid = req.params.gameid;
   let category = req.params.category;
   let topicid = req.params.topicId;
   let id = req.params.id;

//    const replyUpdate = {
//        textArea: req.body.textArea
//    }
   ForumReply
        .update(req.body,
            {where: { 
               gameId: gameid, 
               ownerId: userid, 
               category: category, 
               topicId: topicid,
               id: id
            }}
       )
       .then(spieces => res.status(200).json(spieces))
       .catch(err => res.status(500).json({
           error: err
       }))
});

router.put('/:id', validateSession, function(req, res) {

    ForumReply
         .update(req.body,
             {where: { 

                id: req.params.id
             }}
        )
        .then(spieces => res.status(200).json(spieces))
        .catch(err => res.status(500).json({
            error: err
        }))
 });

 router.get('/all/:id', (req, res) => {
    ForumReply.findAll(

        {where:
            { ownerId: req.params.id }
        }
            
        )
        .then(forumReply => res.status(200).json(forumReply))
        .catch(err => res.status(500).json({
            error: err
        }))
        
 })
module.exports = router;