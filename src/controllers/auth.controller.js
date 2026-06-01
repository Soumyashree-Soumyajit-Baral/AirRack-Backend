import User from '../models/User.model.js';
import { signToken } from '../utils/jwt.utils.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Email and password are required', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isActive) {
    return sendError(res, 'Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return sendError(res, 'Invalid email or password', 401);
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken(user._id);

  return sendSuccess(res, {
    token,
    user: user.toSafeObject(),
  });
};

export const getMe = (req, res) => {
  return sendSuccess(res, { user: req.user.toSafeObject() });
};

export const logout = (req, res) => {
  return sendSuccess(res, { message: 'Logged out successfully' });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendError(res, 'Current and new password are required', 400);
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return sendError(res, 'Current password is incorrect', 401);
  }

  user.password = newPassword;
  await user.save();

  return sendSuccess(res, { message: 'Password changed successfully' });
};
