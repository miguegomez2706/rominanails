import mongoose from 'mongoose';

const businessInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'RominaNails' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  instagram: { type: String, default: '' },
  email: { type: String, default: '' },
  openingHours: {
    type: Map,
    of: String,
    default: {
      lunes: '09:00-18:00',
      martes: '09:00-18:00',
      miercoles: '09:00-18:00',
      jueves: '09:00-18:00',
      viernes: '09:00-18:00',
      sabado: '09:00-14:00',
      domingo: 'Cerrado',
    },
  },
  paymentMethods: {
    type: [String],
    default: ['Efectivo', 'Transferencia', 'Mercado Pago'],
  },
  about: { type: String, default: '' },
  values: { type: [String], default: [] },
  mapUrl: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  logoImage: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('BusinessInfo', businessInfoSchema);
