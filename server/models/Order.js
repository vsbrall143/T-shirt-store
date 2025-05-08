import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
});
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  paymentId: { type: String }, // Razorpay payment ID
  razorpayOrderId: { type: String }, // Razorpay order ID
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveryStatus: {
    type: String,
    default: 'Processing',
  },
}, { timestamps: true });

  
export default mongoose.model('Order', orderSchema);
