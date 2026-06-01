import { ROLE_PERMISSIONS } from '../models/User.model.js';
import { sendError } from '../utils/response.utils.js';

const ROLE_HIERARCHY = {
  super_admin: 3,
  admin: 2,
  tech_rep: 1,
};

/**
 * Restrict access to specific roles only.
 * Usage: authorize('super_admin', 'admin')
 */
export const authorize = (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `Role '${req.user.role}' is not permitted to perform this action`,
        403
      );
    }
    next();
  };

/**
 * Restrict to users at or above a minimum role level.
 * Usage: requireMinRole('admin')
 */
export const requireMinRole = (minRole) =>
  (req, res, next) => {
    if (ROLE_HIERARCHY[req.user.role] < ROLE_HIERARCHY[minRole]) {
      return sendError(res, 'Insufficient permissions', 403);
    }
    next();
  };

/**
 * Restrict to users who have a specific permission.
 * Usage: requirePermission('manage_users')
 */
export const requirePermission = (permission) =>
  (req, res, next) => {
    const permissions = ROLE_PERMISSIONS[req.user.role] || [];
    if (!permissions.includes(permission)) {
      return sendError(res, `Permission '${permission}' required`, 403);
    }
    next();
  };
