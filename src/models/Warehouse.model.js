import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema(
  {
    name:             { type: String, required: [true, 'Warehouse name is required'], trim: true },
    plotNo:           { type: String, trim: true, default: '' },
    street:           { type: String, trim: true, default: '' },
    landmark:         { type: String, trim: true, default: '' },
    area:             { type: String, trim: true, default: '' },
    city:             { type: String, trim: true, default: '' },
    district:         { type: String, trim: true, default: '' },
    state:            { type: String, trim: true, default: '' },
    pin:              { type: String, trim: true, default: '' },
    country:          { type: String, trim: true, default: '' },
    googleMapLocation:{ type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
export default Warehouse;
