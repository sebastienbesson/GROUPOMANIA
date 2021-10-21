const fs = require('fs');

const models = require('../models');

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

