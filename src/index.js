import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { startTrashPurgeJob } from './jobs/purgeTrash.job.js';

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
    startTrashPurgeJob();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
