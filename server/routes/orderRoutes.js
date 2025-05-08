import express from 'express';
import {
  placeOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { getOrderStats } from '../controllers/orderController.js';



import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/place-order', protect, placeOrder);
router.post('/verify', protect, verifyPayment);

router.get('/my-orders', protect, getUserOrders);

// isAdmin routes
router.get('/', protect, isAdmin, getAllOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

router.get('/stats', protect, isAdmin, getOrderStats);

export default router;
