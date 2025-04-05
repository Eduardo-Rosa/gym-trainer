import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: process.env.NODE_ENV === 'production' ? 50 : 10,
      socketTimeoutMS: 30000,
      waitQueueTimeoutMS: 10000
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Event listeners
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection lost:', err);
});

export default connectDB;