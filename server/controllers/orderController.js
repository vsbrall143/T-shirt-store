import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';


dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const user = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No order items provided' });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // amount in paisa
      currency: 'INR',
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    });

    // Create MongoDB order with status 'Pending'
    const newOrder = new Order({
      user,
      items,
      total,
      status: 'Pending',
      paymentId: '', // will be filled after verification
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.status(201).json({
      order: newOrder,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Generate expected signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Update order status to 'Paid'
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (order) {
        order.status = 'Paid';
        order.paymentId = razorpay_payment_id;
        await order.save();
        res.status(200).json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Order not found' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get user's own orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getOrderStats = async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const totalRevenue = await Order.aggregate([
        { $match: { status: 'Paid' } },
        { $group: { _id: null, revenue: { $sum: '$total' } } }
      ]);
  
      res.json({
        totalOrders,
        totalRevenue: totalRevenue[0]?.revenue || 0,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  