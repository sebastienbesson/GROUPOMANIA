const fs = require('fs');
const models = require('../models');
const posts = require('../models/posts');
const jwt = require('jsonwebtoken');
const comments = require('../models/comments');

exports.createPost = (req, res, next) => {
      delete req.body.id;
      const postObject = req.body;
        if (!req.file){
        post = {...postObject};
        }else
        post = {
          ...postObject,
        contentUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
      models.Post.create ({
        userId: req.userId,
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        contentURL: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        likes: req.body.likes
      })
      .then(() => res.status(201).json({ message: 'Post crée!' }))
      .catch(error => {console.log('error', error);res.status(400).json({ message: 'Post non crée!' })});
};

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({ 
    include: {
      model: models.User,
      attributes: ['userName']
    },
  })
  .then(function(posts) {
    if (posts) {
      res.status(200).json(posts);
    }else {
      res.status(404).json({"error": "pas de posts trouvés"});
    }
  }).catch(function(err) {
      console.log(err);
      res.status(500).json({"error": "champs non valides"});
  });
};

exports.getOnePost = (req, res, next) => {
  models.Post.findOne({ 
      where: {id:req.params.id},
      include: {
        model: models.User,
        attributes: ["userName"]
      },
    })
    .then(function(post) {
    if (post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({"error": "pas de post trouvé"});
    }
  }).catch(function(err) {
      console.log(err);
      res.status(500).json({"error": "champs non valides"});
  });
};

exports.modifyPost = (req, res, next) => {
  console.log('req.userIdControllers', req.userId);
  models.Post.findOne({where: {id: req.params.id }})
  .then(post  => {
    if(post.userId==req.userId){
      post.title = req.body.title
			post.content = req.body.content
			post.contentURL = req.body.contentURL
      post.save()
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ message: 'Post non modifié!' }));
    }else{
      res.status(403).json({ message: 'Suppression non autorisée!' });
    } 
  })
  .catch(error => {console.log('error', error);res.status(500).json({ message: 'post non modifié!' })}); 
};

exports.deleteOnePost = (req, res, next) => {
  console.log('req.userIdControllers', req.userId);
  models.Post.findOne({where: { id: req.params.id }})
    .then(post  => {
      if(post.userId==req.userId){
        models.Post.destroy({where : { id: req.params.id}})
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ message: 'Post non supprimé!' }));
      }else{
        res.status(403).json({ message: 'Suppression non autorisée!' });
      } 
    })
    .catch(error => {console.log('error', error);res.status(500).json({ message: 'post non supprimé!' })}); 
};

exports.like = (req, res, next) => {
  models.Post.findOne({ id: req.params.id })
    .then(post => {
      switch (req.body.like) {
        case -1:
          Post.updateOne({ id: req.params.id }, {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
              id: req.params.id
              })
            .then(() => res.status(201).json({ message: 'avis négatif!'}))
            .catch( error => res.status(400).json({ error }))
        break;
        case 0:
          if (post.usersLiked.find(user => user === req.body.userId)) {
              Post.updateOne({ id : req.params.id }, {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                id: req.params.id
              })
            .then(() => res.status(201).json({message: ' avis positif retiré !'}))
            .catch( error => res.status(400).json({ error }))
          }
          if (post.usersDisliked.find(user => user === req.body.userId)) {
              Post.updateOne({ id : req.params.id }, {
                $inc: { dislikes:-1 },
                $pull: { usersDisliked: req.body.userId },
                id: req.params.id
              })
            .then(() => res.status(201).json({message: ' avis négatif retiré !'}))
            .catch( error => res.status(400).json({ error }));
          }
          break;
        case 1:
          Post.updateOne({ _id: req.params.id }, {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
              id: req.params.id
              })
            .then(() => res.status(201).json({ message: 'avis positif!'}))
            .catch( error => res.status(400).json({ error }));
        break;
      default:
      return res.status(500).json({ error });
      }
    })
    .catch(error => res.status(500).json({ error }))
};


