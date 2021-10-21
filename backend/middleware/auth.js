const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token',token);
    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Identifiant non valide';
    } else {
      console.log('req.userId',userId);
      req.userId=userId
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non valide!')
    });
  }
};

