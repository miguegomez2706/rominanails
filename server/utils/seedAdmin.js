import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@rominanails.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin ya existe: admin@rominanails.com');
    } else {
      await User.create({
        email: 'admin@rominanails.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin creado: admin@rominanails.com / admin123');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
