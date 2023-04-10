const mongoose = require('mongoose')
const Product = require('./model');
require('dotenv').config();

const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUrl)

async function getProducts() {
	const docs = await Product.find().select('name price _id').exec()

    // let count: docs.length
	const response =  docs.map(doc => {
        return {
            name: doc.name,
            price: doc.price,
            id: doc._id,
            
        }
    })
    // console.log(response)
    return response
}

// getProducts()

module.exports = {
	getProducts 
}