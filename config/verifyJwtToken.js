const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification

// Middleware function to verify JWT token
module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); // Get the token from the request headers

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' }); // Return error if no token is provided
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT_SECRET from environment variables
        req.user = verified; // If token is valid, set `req.user` to the decoded token payload
        console.log(req.user);
        next(); // Call next middleware function
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' }); // Return error if token is invalid
    }
};