import express from 'express';
import {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon
} from '../controllers/couponController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes and allow only admin
router.use(protect, isAdmin);

router.post('/', createCoupon);
router.get('/', getCoupons);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
