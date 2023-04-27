const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'


// if (mongoose.connection.readyState !== 1) {
// There is no active connection, connect to MongoDB Atlas


mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(error => {
  console.error('Failed to connect to MongoDB Atlas', error);
})

console.log('connection to dbname', process.env.MONGO_DBNAME)
let db = mongoose.connection.useDb(process.env.MONGO_DBNAME)

// 'mydatabase'
// 'test'


const productSchema = require('./productSchema')
const Product = db.model('Product', productSchema);

module.exports = {
  Product
}
