// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify if the user has an admin role.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const adminMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    // If no token is provided, return a 403 Forbidden status
    return res.status(403).json({ message: 'Authentication token required' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the decoded token has an admin role
    if (decoded.role !== 'admin') {
      // If the user is not an admin, return a 403 Forbidden status
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    // Attach the decoded user to the request object
    req.user = decoded;
    // Proceed to the next middleware
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 401 Unauthorized status
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = adminMiddleware;
