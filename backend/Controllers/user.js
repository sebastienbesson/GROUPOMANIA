const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const models = require('../models');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      models.User.create({
        userName: req.body.userName,
        email: req.body.email,
        contentUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        isAdmin: req.body.isAdmin,
        password: hash
      })
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => {console.log('error', error);res.status(400).json({ message: 'problème à la création du compte' })});
    })
    .catch(error => {console.log('error', error);res.status(500).json({ message: 'erreur' })});
};

exports.login = (req, res, next) => {
  models.User.findOne({ where: { email: req.body.email }})
    .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
    if (!valid) {
      return res.status(401).json({message: 'Données incorrectes!'});
    }
      res.status(200).json({
        isAdmin: user.isAdmin,
        userId: user.id,
        userName: user.userName,
        message: 'utilisateur trouvé',
        token: jwt.sign(
          { userId: user.id,
            isAdmin: user.isAdmin,
            user: user.userName 
          },
          process.env.SECRET_CODE,
          { expiresIn: '24h' }),
      });
    })
    .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res) => {
  models.User.findOne({ where: { id:req.params.id }})
    .then(function(user) {
    if (user) {
      res.status(200).json(user);
    }else{
      res.status(404).json({"error": "pas de user trouvé"});
    }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({"error": "champs non valides"});
    });
};

exports.modifyUser = (req, res, next) => { 
  const userObject = req.file ? 
    { ...req.body,
      contentUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    } : { ...req.body };
  models.User.findOne({where: { id: req.params.id }})
    .then(user  => {
    if(user.id === req.userId || req.isAdmin === true) {
      models.User.update(userObject, { where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Information(s) modifiée(s) !'}))
    }else{
      res.status(403).json({ message: 'Modification non autorisée!' });
    }
    })
    .catch(error => {console.log('error', error);res.status(500).json({ message: 'Erreur' })});  
};

exports.modifyPassword = (req, res, next) => {
  userId=req.userId 
	models.User.findOne({ where: {id : req.userId }})
		.then(user => {
		if( user.id === req.userId || req.isAdmin === true) { 
			bcrypt.genSalt(10, function(err, salt) {
			  bcrypt.hash(req.body.password, salt, function(err, hash) {
          user.password = hash
          user.save()
			  .then(() => res.status(201).json({ message: 'Mot de passe modifié' }))
			  .catch(error => {console.log('error', error);res.status(400).json({ message: 'Erreur' })});
			  })
			})
		}else{
			user.save()
			.then(() => res.status(201).json({ message: 'Pas de modifications faites!' }))
			.catch(error => res.status(500).json({ error: 'Erreur' }));
		}
		})
		.catch(error => res.status(500).json({ error: 'Erreur' }));
};

exports.deleteUser = (req, res, next) => {
  models.User.findOne({ where: {id : req.params.id }})
		.then(user => {
		if(user.id === req.userId || req.isAdmin === true) {
			models.User.destroy({ where: {id : req.params.id }}) 
			.then(() => res.status(200).json({ message: 'Utilisateur supprimé!' }))
			.catch(error => res.status(400).json({ message: 'Utilisateur non supprimé!' }));
		}else{
      res.status(403).json({ message: 'Suppression non autorisée!' });
    }
		})
		.catch(error => {console.log('error', error);res.status(500).json({ message: 'Erreur' })});
};


