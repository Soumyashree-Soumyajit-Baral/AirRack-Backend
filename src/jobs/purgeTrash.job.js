import AuditLog from '../models/AuditLog.model.js';

const TRASH_RETENTION_MS = 72 * 60 * 60 * 1000; // 72 hours
const CHECK_INTERVAL_MS = 60 * 60 * 1000;       // re-check every hour

export const purgeOldTrash = async () => {
  const cutoff = new Date(Date.now() - TRASH_RETENTION_MS);
  const result = await AuditLog.deleteMany({ action: 'deleted', timestamp: { $lte: cutoff } });
  if (result.deletedCount > 0) {
    console.log(`[purgeTrash] Removed ${result.deletedCount} trash record(s) older than 72 hours`);
  }
};

export const startTrashPurgeJob = () => {
  purgeOldTrash().catch((err) => console.error('[purgeTrash] Initial purge failed:', err.message));
  setInterval(() => {
    purgeOldTrash().catch((err) => console.error('[purgeTrash] Scheduled purge failed:', err.message));
  }, CHECK_INTERVAL_MS);
};
