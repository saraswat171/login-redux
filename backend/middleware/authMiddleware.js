const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        res.locals.isAuthenticated = false;
        return res.sendStatus(401);
    }

    jwt.verify(token, 'jwt-key', (err, user) => {
        if (err) {
            res.locals.isAuthenticated = false;
            return res.sendStatus(403);
        }
        req.user = user;
        res.locals.isAuthenticated = true; 
        next();
    });
};

module.exports = authenticateJWT;
