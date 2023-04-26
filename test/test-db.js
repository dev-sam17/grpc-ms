require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'

async function testDb() {
    if (mongoose.connection.readyState !== 1) {
        // There is no active connection, connect to MongoDB Atlas
        try {
          await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log('Connected to MongoDB Atlas');
        } catch (error) {
          console.error('Failed to connect to MongoDB Atlas', error);
        }
      } else {
        console.log('Already connected to MongoDB Atlas');
      }
}

const db = mongoose.connection.useDb('test')

module.exports = {
    db,
    testDb
}