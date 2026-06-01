import AuditLog from '../models/AuditLog.model.js';
import { sendSuccess } from '../utils/response.utils.js';

export const getRecordTimeline = async (req, res) => {
  const logs = await AuditLog.find({ recordId: req.params.id }).sort({ timestamp: -1 });
  return sendSuccess(res, { logs });
};

export const getDeletedLogs = async (req, res) => {
  const logs = await AuditLog.find({ action: 'deleted' }).sort({ timestamp: -1 });
  return sendSuccess(res, { logs });
};
