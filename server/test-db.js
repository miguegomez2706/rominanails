import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rominanails')
  .then(async () => {
    const db = mongoose.connection.db;
    const b = await db.collection('businessinfos').findOne();
    console.log("Map URL from DB:", b?.mapUrl);
    process.exit(0);
  })
  .catch(console.error);
