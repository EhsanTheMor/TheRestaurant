import mongoose from 'mongoose';

export default async function connectDB() {
     const uri = process.env.MONGO_URI;
     if (!uri) return new Error('Please provide proper uri');

     try {
          if (mongoose.connection.readyState === 0) {
               await mongoose.connect(uri);
               console.log('data base is connected');
          }
     } catch (err) {
          console.log(err);
     }
}
