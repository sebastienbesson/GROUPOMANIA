const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
  
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    console.log('isAdmin',isAdmin);
    if (req.body.userId &&  req.body.userId !== userId && !isAdmin){
      throw 'Identifiant non valide';
    } 
    else {
      console.log('req.userIdauth',userId);
      console.log('req.isAdminauth',isAdmin);
      req.userId=userId
      req.isAdmin=isAdmin
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non valide!')
    });
  }
};

