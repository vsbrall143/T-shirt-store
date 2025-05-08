import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  size: String,
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
