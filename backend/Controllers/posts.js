const fs = require('fs');
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

exports.modifyPost = async (req, res) => {
	try {
		const postObject = req.file
			? {
					...req.body,
					contentUrl: `${req.protocol}://${req.get('host')}/images/${
						req.file.filename
					}`,
			  }
			: { ...req.body };

		if (postObject.contentUrl) {
			const oldPost = await models.Post.findOne({ where: { id: req.params.id } });
			const oldFile = oldPost.contentUrl.split('/images/')[1];
			fs.unlinkSync(`images/${oldFile}`);
		}
		const post = await models.Post.update(postObject, {
			where: { id: req.params.id },
		});
		if (!post) {
			res.status(404).send();
		}
		res.status(200).json({ message: 'Post modifié' });
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
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



