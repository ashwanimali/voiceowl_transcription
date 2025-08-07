import mongoose from 'mongoose';
import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;
console.log("PORT", process.env.PORT)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB', err);
  });
