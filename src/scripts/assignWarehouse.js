import 'dotenv/config';
import mongoose from 'mongoose';
import Warehouse from '../models/Warehouse.model.js';
import RacksData from '../models/RacksData.model.js';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  const wh = await Warehouse.findOne({ name: 'Warehouse 01' });
  if (!wh) { console.error('Warehouse 01 not found'); process.exit(1); }

  const result = await RacksData.updateMany(
    { warehouseId: null },
    { $set: { warehouseId: wh._id } }
  );
  console.log(`✓ Updated ${result.modifiedCount} records → Warehouse 01`);

  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
