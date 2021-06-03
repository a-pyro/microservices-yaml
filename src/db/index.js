import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    console.log('server connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
