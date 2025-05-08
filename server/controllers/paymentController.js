import razorpay from '../utils/razorpay.js';
import crypto from 'crypto';

export const createPaymentOrder = async (req, res) => {
  try {
    console.log("create payment order controller called")
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify payment (webhook or frontend signature)
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (sign === razorpay_signature) {
      return res.json({ success: true, paymentId: razorpay_payment_id });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
