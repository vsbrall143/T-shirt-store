import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { addReview } from '../controllers/productController.js';



import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.post('/:id/reviews', protect, addReview);
router.get('/', getAllProducts);
router.get('/:id', getProduct);

export default router;
