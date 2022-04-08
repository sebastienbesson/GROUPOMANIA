const fs = require('fs');
const models = require('../models');

exports.createPost = (req, res, next) => {
    models.Post.create ({
        userId: req.userId,
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        contentUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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

/*exports.modifyPost = (req, res, next) => {
  console.log('req.userIdControllers', req.userId);
  models.Post.findOne({where: {id: req.params.id }})
  .then(post  => {
    if(post.userId==req.userId){
      post.title = req.body.title
			post.content = req.body.content
			post.contentUrl = req.body.contentUrl
      post.save()
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ message: 'Post non modifié!' }));
    }else{
      res.status(403).json({ message: 'Modification non autorisée!' });  
    } 
  })
  .catch(error => {console.log('error', error);res.status(500).json({ message: 'post non modifié!' })}); 
};*/

exports.modifyPost = (req, res, next) => {
  const postUpdated = req.file
    ? {
      ...JSON.parse(req.body.post),
        contentUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
      console.log(postUpdated);
  const updatePost = () => {
    models.Post.update(postUpdated, { where: { id: req.params.id } })
      .then(() => res.status(201).json({ message: "Post modifié" }))
      .catch((error) => res.status(400).json({ error }));
  };

  if (req.file) {
    models.Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (post.contentUrl) {
          const filename = post.contentUrl.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            updatePost();
          });
        } else {
          updatePost();
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    updatePost();
  }
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



