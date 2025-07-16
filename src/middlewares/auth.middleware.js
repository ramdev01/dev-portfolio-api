const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.payload = payload; 
        next();
    });
};
