const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const models = require('../models');

exports.signup = (req, res, next) => {
  console.log('password',req.body.password);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        models.User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => {console.log('error', error);res.status(400).json({ message: 'email deja existant' })});
      })
      .catch(error => {console.log('error', error);res.status(500).json({ message: 'pas bon' })});
};

exports.login = (req, res, next) => {
  console.log('email',req.body.email);
  console.log('password',req.body.password);
  models.User.findOne({ where: {email : req.body.email }})
    .then(User => {
      if (!User) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, User.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          {console.log('utilisateur trouvé');res.status(200).json({
            userId: User.id,
            token: jwt.sign(
                { userId: User.id },
                process.env.SECRET_CODE,
                { expiresIn: '24h'}
            )
          })};
        })
        .catch(error => res.status(500).json({ message: 'erreur A' }));
    })
    .catch(error => res.status(500).json({ message : 'erreur B' }));
};  

exports.modify = (req, res, next) => {
  console.log('req.userId', req.userId);
  userId=req.userId 
	models.User.findOne({ where: {email : req.body.email }})
		.then(user => {
			if(req.body.password) { 
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						user.name = req.body.name
						user.password = hash
						user.email = req.body.email
						user.save()
							.then(() => res.status(201).json({ message: 'mot de passe modifié!' }))
							.catch(error => res.status(500).json({ error: 'ERREUR A'}));
					})
				})
			}else{
				user.name = req.body.name
				user.email = req.body.email
				user.save()
					.then(() => res.status(201).json({ message: 'Profil modifié!' }))
					.catch(error => res.status(500).json({ error: 'ERREUR B' }));
			}
		})
		.catch(error => res.status(500).json({ error: 'ERREUR C' }));
};

exports.delete = (req, res, next) => {
  console.log('req.userId', req.userId);
	models.User.findOne({where :{id:req.userId}})
		.then(user => {
			if(user !== null) {
				user.destroy()
					.then(() => res.status(200).json({ message: 'Utilisateur supprimé!' }))
					.catch(error => res.status(500).json({ error }));
			}
		})
		.catch(error => res.status(401).json({ message: 'Suppression non autorisée!' }));
};




