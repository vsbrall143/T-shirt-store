import Product from '../models/Product.js';

// Add a new product (admin)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products with search and sort
export const getAllProducts = async (req, res) => {
  try {
    const { search, sortBy, order } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const products = await Product.find(query)
      .sort({ [sortBy || 'createdAt']: order === 'desc' ? -1 : 1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product (admin)
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product (admin)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);

    // Recalculate average rating
    product.averageRating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    
    await product.save();
    
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
