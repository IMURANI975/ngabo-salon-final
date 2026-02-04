import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import appointmentsRouter from './routes/appointments.js';
import contactsRouter from './routes/contacts.js';
import servicesRouter from './routes/services.js';
import teamRouter from './routes/team.js';
import testimonialsRouter from './routes/testimonials.js';
import galleryRouter from './routes/gallery.js';
import authRouter from './routes/auth.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ngabo-saloon';

// Middlewares
app.use(cors({
  origin: "https://ngabo-salon-final-1-frontend.onrender.com",
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/team', teamRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/dashboard', dashboardRouter);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

// Connect and start server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
