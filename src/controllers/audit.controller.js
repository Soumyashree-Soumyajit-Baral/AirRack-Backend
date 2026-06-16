import AuditLog from '../models/AuditLog.model.js';
import RacksData from '../models/RacksData.model.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

export const getRecordTimeline = async (req, res) => {
  try {
    const logs = await AuditLog.find({ recordId: req.params.id }).sort({ timestamp: -1 });
    return sendSuccess(res, { logs });
  } catch (err) {
    return sendError(res, err.message || 'Failed to load timeline', 500);
  }
};

export const getDeletedLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({ action: 'deleted' }).sort({ timestamp: -1 });
    return sendSuccess(res, { logs });
  } catch (err) {
    return sendError(res, err.message || 'Failed to load deleted logs', 500);
  }
};

export const restoreRecord = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id);
    if (!log || log.action !== 'deleted') {
      return sendError(res, 'Deleted log not found', 404);
    }

    const s = log.snapshot || {};

    // Only pass non-empty values so Mongoose defaults apply where needed
    const payload = {
      boxId:    log.boxId,
      boxStatus: s.boxStatus || 'Active',
      condition: s.condition || 'Good',
    };

    if (s.aircraftType)         payload.aircraftType         = s.aircraftType;
    if (s.aircraftRegistration) payload.aircraftRegistration = s.aircraftRegistration;
    if (s.msn)                  payload.msn                  = s.msn;
    if (s.recordType)           payload.recordType           = s.recordType;
    if (s.recordDescription)    payload.recordDescription    = s.recordDescription;
    if (s.dateRangeFrom)        payload.dateRangeFrom        = s.dateRangeFrom;
    if (s.dateRangeTo)          payload.dateRangeTo          = s.dateRangeTo;
    if (s.zone)                 payload.zone                 = s.zone;
    if (s.aisle)                payload.aisle                = s.aisle;
    if (s.rack)                 payload.rack                 = s.rack;
    if (s.level)                payload.level                = s.level;
    if (s.fullLocationCode)     payload.fullLocationCode     = s.fullLocationCode;
    if (s.lastMovementDate)     payload.lastMovementDate     = s.lastMovementDate;
    if (s.issuedTo)             payload.issuedTo             = s.issuedTo;
    if (s.returnDueDate)        payload.returnDueDate        = s.returnDueDate;
    if (s.remarks)              payload.remarks              = s.remarks;
    if (s.warehouseId)          payload.warehouseId          = s.warehouseId;

    const record = await RacksData.create(payload);

    await AuditLog.create({
      recordId: record._id,
      boxId: record.boxId,
      action: 'created',
      performedBy: req.user._id,
      performedByName: req.user.name,
    });

    await AuditLog.findByIdAndDelete(req.params.id);

    return sendSuccess(res, { message: 'Record restored successfully', record });
  } catch (err) {
    return sendError(res, err.message || 'Failed to restore record', 500);
  }
};

export const permanentDeleteLog = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id);
    if (!log || log.action !== 'deleted') {
      return sendError(res, 'Deleted log not found', 404);
    }
    await AuditLog.findByIdAndDelete(req.params.id);
    return sendSuccess(res, { message: 'Record permanently deleted' });
  } catch (err) {
    return sendError(res, err.message || 'Failed to permanently delete', 500);
  }
};
