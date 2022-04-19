const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const models = require('../models');

exports.signup = (req, res, next) => {
  console.log('password',req.body.password);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        models.User.create({
          userName: req.body.userName,
          email: req.body.email,
          contentUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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

exports.getUser = (req, res) => {
  models.User.findOne({ 
      where: {id:req.params.id},
    })
    .then(function(user) {
    if (user) {
      res.status(200).json(user);
    }else {
      res.status(404).json({"error": "pas de user trouvé"});
    }
  }).catch(function(err) {
      console.log(err);
      res.status(500).json({"error": "champs non valides"});
  });
};

exports.modifyPassword = (req, res, next) => {
  console.log('req.userId', req.userId);
  userId=req.userId 
	models.User.findOne({ where: {email : req.body.email }})
		.then(user => {
			if(req.body.password) { 
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						user.username = req.body.username
						user.password = hash
						user.email = req.body.email
						user.save()
							.then(() => res.status(201).json({ message: 'information(s) modifiée(s)!' }))
							.catch(error => {console.log('error', error);res.status(400).json({ message: 'Erreur A' })});
					})
				})
			}else{
				user.userName = req.body.userName
				user.email = req.body.email
				user.save()
					.then(() => res.status(201).json({ message: 'Profil modifié!' }))
					.catch(error => res.status(500).json({ error: 'ERREUR B' }));
			}
		})
		.catch(error => res.status(500).json({ error: 'ERREUR C' }));
};

exports.modifyUser = async (req, res) => {
	try {
		const userObject = req.file
			? {
					...req.body,
					contentUrl: `${req.protocol}://${req.get('host')}/images/${
						req.file.filename
					}`,
			  }
			: { ...req.body };

		if (userObject.contentUrl) {
			const oldUser = await models.User.findOne({ where: { id: req.params.id } });
			const oldFile = oldUser.contentUrl.split('/images/')[1];
			fs.unlinkSync(`images/${oldFile}`);
		}
		const user = await models.User.update(userObject, {
			where: { id: req.params.id },
		});
		if (!user) {
			res.status(404).send();
		}
		res.status(200).json({ message: 'Utilisateur modifié' });
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
}; 

exports.deleteUser = (req, res, next) => {
  models.User.findOne({ where: {id : req.params.id }})
		.then(user => {
			if(user.id==req.userId) {
				models.User.destroy({ where: {id : req.params.id }}) 
					.then(() => res.status(200).json({ message: 'Utilisateur supprimé!' }))
					.catch(error => res.status(400).json({ message: 'Utilisateur non supprimé!' }));
			}else{
        res.status(403).json({ message: 'Suppression non autorisée!' });
      }
		})
		.catch(error => {console.log('error', error);res.status(500).json({ message: 'Utilisateur non supprimé!' })});
};




