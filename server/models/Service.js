import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El nombre del servicio es obligatorio'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['Manicura', 'Pedicura', 'Nail Art', 'Tratamientos', 'Combos'],
  },
  duration: {
    type: Number,
    required: [true, 'La duración es obligatoria'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
  },
  image: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
