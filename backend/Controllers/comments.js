const models = require('../models');
const comments = require('../models/comments');

exports.createComment = (req, res, next) => {
      delete req.body.id;
      console.log('models',models);
      models.Comment.create ({
        name: req.body.name,
        content: req.body.content
      })
      .then(() => res.status(201).json({ message: 'Comment crée!' }))
      .catch(error => {console.log('error', error);res.status(400).json({ message: 'Comment non crée!' })});
};

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll()
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
    models.Comment.findOne({ where: {id:req.params.id}})
      .then(function(comment) {
      if (comment) {
        res.status(200).json(comment);
      }else {
        res.status(404).json({"error": "pas de comment trouvé"});
      }
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({"erro": "champs non valides"});
    });
};

exports.deleteOneComment = (req, res, next) => {
    console.log('req.userId', req.userId);
        models.Comment.findOne({where :{id:req.body.id}})
            .then(comment => {
                if(comment !== null) {
                    comment.destroy({where : {id:req.body.id}})
                      .then(() => res.status(200).json({ message: 'Comment supprimé!' }))
                      .catch(error => res.status(500).json({ message: 'Comment non supprimé' }));
                }
            })
            .catch(error => res.status(401).json({ message: 'Suppression non autorisée!' }));
};


