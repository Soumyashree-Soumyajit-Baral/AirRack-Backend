import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: [
      "https://afmairrack.netlify.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', environment: process.env.NODE_ENV })
);

app.use('/api', routes);

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

export default app;
