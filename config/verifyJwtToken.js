const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification

// Middleware function to verify JWT token
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. Invalid or no token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part without the "Bearer" prefix

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports