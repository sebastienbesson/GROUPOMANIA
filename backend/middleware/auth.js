const jwt = require('jsonwebtoken');

require('dotenv').config();

 module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
  
    const userId = decodedToken.userId;
    const isAdmin = req.body.isAdmin;
    console.log(isAdmin);
    if (req.body.userId && req.body.userId !== userId){
      throw 'Identifiant non valide';
    } else if (req.body.isAdmin && req.body.isAdmin !== true){
      throw 'Identifiant non admin';
    }
    else {
      console.log('req.userIdauth',userId);
      console.log('req.isAdminauth',isAdmin);
      req.userId=userId
      
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non valide!')
    });
  }
};

