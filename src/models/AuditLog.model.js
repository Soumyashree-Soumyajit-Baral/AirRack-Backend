import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  recordId: { type: mongoose.Schema.Types.ObjectId, ref: 'RacksData' },
  boxId: { type: String, required: true },
  action: {
    type: String,
    enum: ['created', 'updated', 'deleted', 'status_changed'],
    required: true,
  },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  performedByName: { type: String, default: 'Unknown' },
  field: { type: String, default: '' },
  fieldLabel: { type: String, default: '' },
  oldValue: { type: String, default: '' },
  newValue: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  /* snapshot fields stored only for 'deleted' action */
  snapshot: {
    aircraftType:         { type: String, default: '' },
    aircraftRegistration: { type: String, default: '' },
    msn:                  { type: String, default: '' },
    recordType:           { type: String, default: '' },
    recordDescription:    { type: String, default: '' },
    dateRangeFrom:        { type: Date },
    dateRangeTo:          { type: Date },
    zone:                 { type: String, default: '' },
    aisle:                { type: String, default: '' },
    rack:                 { type: String, default: '' },
    level:                { type: String, default: '' },
    fullLocationCode:     { type: String, default: '' },
    boxStatus:            { type: String, default: '' },
    condition:            { type: String, default: '' },
    lastMovementDate:     { type: Date },
    issuedTo:             { type: String, default: '' },
    returnDueDate:        { type: Date },
    remarks:              { type: String, default: '' },
    warehouseId:          { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', default: null },
  },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
