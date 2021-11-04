const fs = require('fs');

const models = require('../models');
const posts = require('../models/posts');



exports.createPost = (req, res, next) => {
      delete req.body.id;
      console.log('models',models);
      models.Post.create ({
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        contentURL: req.body.contentURL,
        likes: req.body.likes
      })
      .then(() => res.status(201).json({ message: 'Post crée!' }))
      .catch(error => {console.log('error', error);res.status(400).json({ message: 'Post non crée!' })});
};

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll()
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

exports.getAllPostsForOne = (req, res, next) => {
  let list = ""
  models.Post.findAll({ 
      where: { id: req.params.id },
  })
  .then((res) => { 
      list = res;
      res.status(200).json( { list } )
  })
  .catch((error) => { res.status(404).json({ "error" : "pas de posts trouvés pour la personne" })})
};

exports.deleteOnePost = (req, res, next) => {
  console.log('req.userId', req.userId);
	models.Post.findOne({where :{id:req.body.id}})
		.then(post => {
			if(post !== null && req.body.userId==userId) {
				post.destroy({where : {id:req.body.id}})
					.then(() => res.status(200).json({ message: 'Post supprimé!' }))
					.catch(error => res.status(500).json({ message: 'Post non supprimé' }));
			}
		})
		.catch(error => res.status(401).json({ message: 'Suppression non autorisée!' }));
};

