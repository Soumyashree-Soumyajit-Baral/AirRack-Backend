import 'dotenv/config';
import mongoose from 'mongoose';
import RacksData from '../models/RacksData.model.js';

const records = [
  // ── Tech Log Pages (BOX-001 to BOX-010) ──
  { boxId: 'BOX-001', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2015, dateRangeTo: 2015, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L07', boxStatus: 'Active', condition: 'Good', remarks: 'Aug 2015 TLP missing' },
  { boxId: 'BOX-002', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2016, dateRangeTo: 2016, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L07', boxStatus: 'Active', remarks: 'Box to be replaced' },
  { boxId: 'BOX-003', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2017, dateRangeTo: 2017, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L07', condition: 'Damaged' },
  { boxId: 'BOX-004', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2018, dateRangeTo: 2018, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L07' },
  { boxId: 'BOX-005', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2019, dateRangeTo: 2019, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L06' },
  { boxId: 'BOX-006', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2020, dateRangeTo: 2020, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L06' },
  { boxId: 'BOX-007', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2021, dateRangeTo: 2021, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L06' },
  { boxId: 'BOX-008', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2022, dateRangeTo: 2022, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L06' },
  { boxId: 'BOX-009', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2023, dateRangeTo: 2023, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L05' },
  { boxId: 'BOX-010', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Tech Log Pages', dateRangeFrom: 2024, dateRangeTo: 2024, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L05' },

  // ── Scheduled Workorders (BOX-011 to BOX-021) ──
  { boxId: 'BOX-011', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2015, dateRangeTo: 2015, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L05', boxStatus: 'Active', remarks: 'Box to be replaced' },
  { boxId: 'BOX-012', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2016, dateRangeTo: 2016, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L05', boxStatus: 'Active', condition: 'Damaged', remarks: 'Box to be replaced' },
  { boxId: 'BOX-013', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2017, dateRangeTo: 2017, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L04' },
  { boxId: 'BOX-014', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2018, dateRangeTo: 2018, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L04' },
  { boxId: 'BOX-015', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2019, dateRangeTo: 2019, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L04' },
  { boxId: 'BOX-016', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2020, dateRangeTo: 2020, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L04' },
  { boxId: 'BOX-017', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2021, dateRangeTo: 2021, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L03' },
  { boxId: 'BOX-018', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2022, dateRangeTo: 2022, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L03' },
  { boxId: 'BOX-019', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2023, dateRangeTo: 2023, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L03' },
  { boxId: 'BOX-020', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2024, dateRangeTo: 2024, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L03' },
  { boxId: 'BOX-021', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Scheduled Workorders', dateRangeFrom: 2025, dateRangeTo: 2025, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L02' },

  // ── Defect Workorders (BOX-022 to BOX-030) ──
  { boxId: 'BOX-022', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2016, dateRangeTo: 2016, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L02', boxStatus: 'Active', condition: 'Good' },
  { boxId: 'BOX-023', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2017, dateRangeTo: 2017, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L02', boxStatus: 'Active', condition: 'Damaged', remarks: 'Box to be replaced' },
  { boxId: 'BOX-024', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2018, dateRangeTo: 2018, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L02' },
  { boxId: 'BOX-025', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2019, dateRangeTo: 2019, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L01' },
  { boxId: 'BOX-026', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2020, dateRangeTo: 2020, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L01' },
  { boxId: 'BOX-027', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2021, dateRangeTo: 2021, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L01' },
  { boxId: 'BOX-028', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2022, dateRangeTo: 2022, zone: 'Z01', aisle: 'A2R', rack: 'R005', level: 'L01' },
  { boxId: 'BOX-029', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2023, dateRangeTo: 2023, zone: 'Z01', aisle: 'A2R', rack: 'R006', level: 'L07' },
  { boxId: 'BOX-030', aircraftType: 'A320', aircraftRegistration: 'VT-ABC', msn: '1234', recordType: 'Defect Workorders', dateRangeFrom: 2024, dateRangeTo: 2024, zone: 'Z01', aisle: 'A2R', rack: 'R006', level: 'L07' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const inserted = await RacksData.insertMany(records);
  console.log(`✓ Inserted ${inserted.length} records`);

  await mongoose.disconnect();
  console.log('Done.');
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
