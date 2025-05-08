import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // in percent
  expiresAt: { type: Date, required: true },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Coupon', couponSchema);
