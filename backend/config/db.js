require('dotenv').config();
const { MONGO_URI } = require('../../config/keys');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    console.log('MongoDB connection success');
  } catch (error) {
    console.error('MongoDB connection fail');
    process.exit(1);
  }
};

module.exports = connectDB;
