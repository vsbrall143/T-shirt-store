import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
 

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import couponRoutes from './routes/couponRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
 


import path from 'path';






dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupons', couponRoutes);
 


// Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
