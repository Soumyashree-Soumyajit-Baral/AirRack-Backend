import crypto from 'crypto';
import User from '../models/User.model.js';
import { signToken } from '../utils/jwt.utils.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';
import { forgotPasswordEmail } from '../services/email.service.js';

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return sendError(res, 'Email is required', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
    forgotPasswordEmail(user.name, user.email, resetLink);
  }

  // Always return the same message, whether or not the email exists, to avoid leaking which emails are registered.
  return sendSuccess(res, { message: 'If that email is registered, a password reset link has been sent.' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return sendError(res, 'Token and new password are required', 400);
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) {
    return sendError(res, 'This reset link is invalid or has expired', 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return sendSuccess(res, { message: 'Password reset successfully. You can now log in.' });
};
