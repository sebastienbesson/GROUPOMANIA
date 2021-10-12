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
  models.User.findOne({ email: req.body.email })
    .then(User => {
      if (!User) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, User.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: User._id,
            token: jwt.sign(
                { userId: User._id },
                process.env.SECRET_CODE,
                { expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({ message: 'erreur A' }));
    })
    .catch(error => res.status(500).json({ message : 'erreur B' }));
};  
 



