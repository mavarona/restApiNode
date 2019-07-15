const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('No Autorizado');
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let verifyToken;
    try {
        verifyToken = jwt.verify(token, 'SECRETKEY');
    } catch(err){
        err.status = 500;
        throw err;
    }

    if(!verifyToken){
        const error = new Error('No Autorizado');
        error.status = 401;
        throw error;
    }

    return next();

}