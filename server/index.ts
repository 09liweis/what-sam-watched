import mongoose from 'mongoose';

const config = useRuntimeConfig();

export default async ()=>{
  try {
    await mongoose.connect(config.mongoUrl);
    console.log('DB connection works');
  } catch (err) {
    console.error('DB connection fail', err);
  }
}