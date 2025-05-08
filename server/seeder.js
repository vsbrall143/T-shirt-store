import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import { products } from './data/products.js';

dotenv.config();
await connectDB();

try {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('✅ Products seeded');
  process.exit();
} catch (err) {
  console.error('Seeder error:', err);
  process.exit(1);
}
