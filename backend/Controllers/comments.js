const { query } = require('express');
const models = require('../models');
const comments = require('../models/comments');

exports.createComment = (req, res, next) => {
      delete req.body.id;
      models.Comment.create ({
        where:{ postId:req.query.postId},
        userId: req.userId,
        postId: req.body.postId,
        content: req.body.content
      })
      .then(() => res.status (201).json({ message: 'Comment crée!' }))
      .catch(error => {console.log('error', error);res.status(400).json({ message: 'Comment non crée!' })});
};

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
      where:{ postId:req.query.postId},
      include:{
        model: models.User,
        attributes: ['userName']},
      })
    .then(function(comments) {
      if (comments) {
        res.status(200).json(comments);
      }else {
        res.status(404).json({"error": "pas de comments trouvés"});
      }
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({"error": "champs non valides"});
    });
};

exports.getOneComment = (req, res, next) => {
    models.Comment.findOne({ 
      where: {id:req.params.id},
      include: {
        model: models.User,
        attributes: ['userName']},
      })
      .then(function(comment) {
      if (comment) {
        res.status(200).json(comment);
      }else {
        res.status(404).json({"error": "pas de comment trouvé"});
      }
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({"error": "champs non valides"});
    });
};

exports.modifyComment = (req, res, next) => {
  console.log('req.userIdControllers', req.body.userId);
  models.Comment.findOne({where: {id: req.params.id }})
  .then(comment  => {
    if(req.userId==req.userId){
      comment.content = req.body.content
			comment.save()
      .then(() => res.status(200).json({ message: 'Comment modifié !'}))
      .catch(error => res.status(400).json({ message: 'Comment non modifié!' }));
    }else{
      res.status(403).json({ message: 'Modification non autorisée!' });
    } 
  })
  .catch(error => {console.log('error', error);res.status(500).json({ message: 'comment non modifié!' })}); 
};

exports.deleteOneComment = (req, res, next) => {
    console.log('req.userIdControllers', req.body.userId);
    models.Comment.findOne({where:{id:req.params.id}})
    .then(comment => {
      if(req.userId==req.userId){
        comment.content = req.body.content
        comment.destroy()
        .then(() => res.status(200).json({ message: 'Comment supprimé!' }))
        .catch(error => res.status(400).json({ message: 'Comment non supprimé' }));
      }else{
        res.status(403).json({ message: 'Suppression non autorisée!' });
      } 
    })
    .catch(error => {console.log('error', error);res.status(500).json({ message: 'comment non supprimé!' })});
};


