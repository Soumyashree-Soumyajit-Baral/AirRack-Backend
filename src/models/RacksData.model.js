import mongoose from 'mongoose';

const racksDataSchema = new mongoose.Schema(
  {
    boxId: {
      type: String,
      required: [true, 'Box ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    aircraftType: { type: String, trim: true, uppercase: true },
    aircraftRegistration: { type: String, trim: true, uppercase: true },
    msn: { type: String, trim: true },
    recordType: { type: String, trim: true },
    dateRangeFrom: { type: Date },
    dateRangeTo: { type: Date },
    zone: { type: String, trim: true, uppercase: true },
    aisle: { type: String, trim: true, uppercase: true },
    rack: { type: String, trim: true, uppercase: true },
    level: { type: String, trim: true, uppercase: true },
    fullLocationCode: { type: String, trim: true },
    boxStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Issued', 'Archived'],
      default: 'Active',
    },
    condition: {
      type: String,
      enum: ['Good', 'Fair', 'Damaged'],
      default: 'Good',
    },
    lastMovementDate: { type: Date },
    issuedTo: { type: String, trim: true },
    returnDueDate: { type: Date },
    remarks: { type: String, trim: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', default: null },
  },
  { timestamps: true }
);

const buildLocationCode = (doc) => {
  if (doc.zone && doc.aisle && doc.rack && doc.level) {
    return `${doc.zone}-${doc.aisle}-${doc.rack}-${doc.level}`;
  }
  return doc.fullLocationCode;
};

racksDataSchema.pre('save', function () {
  this.fullLocationCode = buildLocationCode(this);
});

export { buildLocationCode };

const RacksData = mongoose.model('RacksData', racksDataSchema);
export default RacksData;
