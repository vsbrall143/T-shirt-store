import express from 'express';
import upload from '../middleware/upload.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/upload (Admin only)
router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;
