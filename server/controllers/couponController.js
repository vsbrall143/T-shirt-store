import Coupon from '../models/Coupon.js';

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;

    const existing = await Coupon.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Coupon code already exists' });

    const coupon = new Coupon({ code, discount, expiresAt });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;
    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      { code, discount, expiresAt },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
