import User from '../models/User.model.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return sendSuccess(res, { users: users.map((u) => u.toSafeObject()) });
};

export const createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password) {
    return sendError(res, 'Name, email and password are required', 400);
  }
  const exists = await User.findOne({ email });
  if (exists) return sendError(res, 'Email already in use', 409);

  const user = await User.create({ name, email, password, phone, role });
  return sendSuccess(res, { user: user.toSafeObject() }, 201);
};

export const updateUser = async (req, res) => {
  const { name, email, phone, role, isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, phone, role, isActive },
    { returnDocument: 'after', runValidators: true }
  );
  if (!user) return sendError(res, 'User not found', 404);
  return sendSuccess(res, { user: user.toSafeObject() });
};

export const deleteUser = async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return sendError(res, 'You cannot delete your own account', 400);
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return sendError(res, 'User not found', 404);
  return sendSuccess(res, { message: 'User deleted successfully' });
};
