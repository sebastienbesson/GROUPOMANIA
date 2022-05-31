const models = require('../models');

exports.createPost = (req, res, next) => {
  const newPost = req.file
    ? {
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        userId: req.userId,
        contentUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
      };

  models.Post.create(newPost)
    .then(() => res.status(201).json({ message: "Post créé" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({ 
    include: {
      model: models.User,
      attributes: ['userName']
    },
    order:[
      ["createdAt","desc"]
    ]
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
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({"error": "champs non valides"});
  });
};

exports.getAllPostsByUser = (req, res, next) => {
  models.Post.findAll({ 
    where: {userId:req.query.userId},
    include: {
      model: models.User,
      attributes: ["userName"]
    },
    order:[
      ["createdAt","desc"]
    ]
  })
  .then(function(posts) {
    if (posts) {
      res.status(200).json(posts);
    }else {
      res.status(404).json({"error": "pas de posts trouvés pour cet user"});
    }
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({"error": "erreur"});
  });
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? 
  { ...req.body.content,
    contentUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  } : { ...req.body };
  models.Post.findOne({where: { id: req.params.id }})
  .then(post  => {
  if(post.userId === req.userId || req.isAdmin === true) {
    models.Post.update(postObject, { where: { id: req.params.id }})
  .then(() => res.status(200).json({ message: 'Post modifié !'}))
  } else {
    res.status(403).json({ message: 'Modification non autorisée!' });
  }
  })
  .catch(error => {console.log('error', error);res.status(500).json({ message: 'Erreur' })});  
};

exports.deleteOnePost = (req, res, next) => {
  models.Post.findOne({where: { id: req.params.id }})
  .then(post  => {
  if(post.userId === req.userId || req.isAdmin === true) {
    models.Post.destroy({where : { id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
  } else {
    res.status(403).json({ message: 'Suppression non autorisée!' });
  }
  })
  .catch(error => {console.log('error', error);res.status(500).json({ message: 'post non supprimé' })}); 
};

