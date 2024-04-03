const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the user has an admin role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    // If the user is an admin, proceed to the next middleware
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminMiddleware;
