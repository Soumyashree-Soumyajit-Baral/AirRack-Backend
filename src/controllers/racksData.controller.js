import RacksData from '../models/RacksData.model.js';
import AuditLog from '../models/AuditLog.model.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

const FIELD_LABELS = {
  boxId: 'Box ID',
  aircraftType: 'Aircraft Type',
  aircraftRegistration: 'Aircraft Registration',
  msn: 'MSN',
  recordType: 'Record Type',
  recordDescription: 'Record Description',
  dateRangeFrom: 'Date From',
  dateRangeTo: 'Date To',
  zone: 'Zone',
  aisle: 'Aisle',
  rack: 'Rack',
  level: 'Level',
  boxStatus: 'Box Status',
  condition: 'Condition',
  lastMovementDate: 'Last Movement Date',
  issuedTo: 'Issued To',
  returnDueDate: 'Return Due Date',
  remarks: 'Remarks',
};

const LOGGABLE_FIELDS = Object.keys(FIELD_LABELS);

const fmtVal = (v) => {
  if (v === null || v === undefined || v === '') return '';
  if (v instanceof Date) return v.toISOString().split('T')[0];
  return String(v).trim();
};

export const getAllRecords = async (req, res) => {
  const filter = {};
  if (req.query.warehouseId) filter.warehouseId = req.query.warehouseId;
  const records = await RacksData.find(filter).sort({ createdAt: 1 });
  return sendSuccess(res, { records, total: records.length });
};

export const createRecord = async (req, res) => {
  const record = await RacksData.create(req.body);
  await AuditLog.create({
    recordId: record._id,
    boxId: record.boxId,
    action: 'created',
    performedBy: req.user._id,
    performedByName: req.user.name,
  });
  return sendSuccess(res, { record }, 201);
};

export const bulkCreateRecords = async (req, res) => {
  const { records, warehouseId } = req.body;
  if (!Array.isArray(records) || records.length === 0) {
    return sendError(res, 'No records provided', 400);
  }

  const docs = records.map((r) => {
    const doc = { ...r };
    if (warehouseId) doc.warehouseId = warehouseId;
    return doc;
  });

  let inserted = [];
  let failedCount = 0;
  try {
    inserted = await RacksData.insertMany(docs, { ordered: false });
  } catch (err) {
    inserted = err.insertedDocs || [];
    failedCount = docs.length - inserted.length;
  }

  if (inserted.length > 0) {
    await AuditLog.insertMany(
      inserted.map((record) => ({
        recordId: record._id,
        boxId: record.boxId,
        action: 'created',
        performedBy: req.user._id,
        performedByName: req.user.name,
      })),
    );
  }

  return sendSuccess(res, {
    insertedCount: inserted.length,
    failedCount,
    records: inserted,
  }, 201);
};

export const updateRecord = async (req, res) => {
  const old = await RacksData.findById(req.params.id);
  if (!old) return sendError(res, 'Record not found', 404);

  const body = { ...req.body };

  const record = await RacksData.findByIdAndUpdate(req.params.id, body, {
    returnDocument: 'after',
    runValidators: true,
  });

  const logs = [];
  for (const field of LOGGABLE_FIELDS) {
    if (body[field] !== undefined) {
      const oldVal = fmtVal(old[field]);
      const newVal = fmtVal(body[field]);
      if (oldVal !== newVal) {
        logs.push({
          recordId: record._id,
          boxId: record.boxId,
          action: field === 'boxStatus' ? 'status_changed' : 'updated',
          performedBy: req.user._id,
          performedByName: req.user.name,
          field,
          fieldLabel: FIELD_LABELS[field],
          oldValue: oldVal,
          newValue: newVal,
        });
      }
    }
  }
  if (logs.length > 0) await AuditLog.insertMany(logs);

  return sendSuccess(res, { record });
};

export const deleteRecord = async (req, res) => {
  const record = await RacksData.findByIdAndDelete(req.params.id);
  if (!record) return sendError(res, 'Record not found', 404);

  await AuditLog.create({
    recordId: req.params.id,
    boxId: record.boxId,
    action: 'deleted',
    performedBy: req.user._id,
    performedByName: req.user.name,
    snapshot: {
      aircraftType:         record.aircraftType         || '',
      aircraftRegistration: record.aircraftRegistration || '',
      msn:                  record.msn                  || '',
      recordType:           record.recordType           || '',
      recordDescription:    record.recordDescription    || '',
      dateRangeFrom:        record.dateRangeFrom,
      dateRangeTo:          record.dateRangeTo,
      zone:                 record.zone                 || '',
      aisle:                record.aisle                || '',
      rack:                 record.rack                 || '',
      level:                record.level                || '',
      fullLocationCode:     record.fullLocationCode     || '',
      boxStatus:            record.boxStatus            || '',
      condition:            record.condition            || '',
      lastMovementDate:     record.lastMovementDate,
      issuedTo:             record.issuedTo             || '',
      returnDueDate:        record.returnDueDate,
      remarks:              record.remarks              || '',
      warehouseId:          record.warehouseId          || null,
    },
  });

  return sendSuccess(res, { message: 'Record deleted successfully' });
};
