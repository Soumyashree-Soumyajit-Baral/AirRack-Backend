import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/User.model.js';
import { sendError } from '../utils/response.utils.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return sendError(res, 'Not authorized — no token provided', 401);
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('+password').select('-password');
    if (!user) return sendError(res, 'User not found', 401);
    if (!user.isActive) return sendError(res, 'Account is deactivated', 403);

    req.user = user;
    next();
  } catch {
    return sendError(res, 'Not authorized — invalid or expired token', 401);
  }
};

export default protect;
