import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Al menos un servicio es obligatorio'],
  }],
  date: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
  },
  time: {
    type: String,
    required: [true, 'La hora es obligatoria'],
  },
  notes: {
    type: String,
    default: '',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'completado', 'cancelado'],
    default: 'pendiente',
  },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
