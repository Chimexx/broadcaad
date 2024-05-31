import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: 'your_db_name',
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error((err as any).message);
    process.exit(1);
  }
};


const seedUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password', salt);
  const user = new User({
    username: 'user',
    password,
  });
  await user.save();
  console.log('User seeded');
};

const runSeed = async () => {
  await connectDB();
  await seedUser();
  mongoose.disconnect();
};

runSeed();
