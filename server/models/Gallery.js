import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
  },
  title: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
