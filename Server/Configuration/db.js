import Mongoose from 'mongoose';
import config from './config.js';

const conectDb = async () => {
  Mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDb Database...")
  });

  console.log("Attempting to connect to MongoDB...");
  if (!config.mongoURI) {
    console.error("❌ Error: MongoDB URI is missing! Please check your MONGODB_URL or MONGO_URI environment variable.");
  } else {
    // Mask password for logging
    const maskedURI = config.mongoURI.replace(/:([^:@]+)@/, ':****@');
    console.log(`Connection string: ${maskedURI}`);
  }

  await Mongoose.connect(`${config.mongoURI}`)
}

export default conectDb;