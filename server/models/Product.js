import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: { type: String, required: true },

  category: String,
  sizes: [String],
  stock: {
    type: Number,
    required: true,
    default: 0,
  }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: String,
}, { timestamps: true });

productSchema.add({ reviews: [reviewSchema] });

productSchema.add({
  averageRating: {
    type: Number,
    default: 0,
  },
});


export default mongoose.model('Product', productSchema);
