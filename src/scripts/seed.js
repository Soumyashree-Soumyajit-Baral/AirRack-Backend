import 'dotenv/config';
import mongoose from 'mongoose';
import User, { ROLES } from '../models/User.model.js';
import connectDB from '../config/db.js';

const SEED_USERS = [
  {
    name: 'Super Admin',
    email: '',
    password: '',
    role: ROLES.SUPER_ADMIN,
  },
  {
    name: 'Warehouse Admin',
    email: '',
    password: '',
    role: ROLES.ADMIN,
  },
  {
    name: 'Tech Rep One',
    email: '',
    password: '',
    role: ROLES.TECH_REP,
  },
];

const seed = async () => {
  await connectDB();
  console.log('Seeding database...');

  for (const userData of SEED_USERS) {
    const exists = await User.findOne({ email: userData.email });
    if (exists) {
      console.log(`  Skipped (already exists): ${userData.email}`);
      continue;
    }
    await User.create(userData);
    console.log(`  Created [${userData.role}]: ${userData.email}`);
  }

  console.log('\nSeed credentials:');
  SEED_USERS.forEach(({ email, password, role }) => {
    console.log(`  ${role.padEnd(12)} | ${email} | ${password}`);
  });

  await mongoose.disconnect();
  console.log('\nDone.');
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
