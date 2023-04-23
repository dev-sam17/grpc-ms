const mongoose = require('mongoose')
const Product = require('./model');

const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

async function getProducts() {
	const docs = await Product.find().select('name price _id').exec()

	const response = docs.map(doc => {
		return {
			name: doc.name,
			price: String(doc.price),
			id: doc._id,
		}
	})
	return response
}


async function getProductById(id) {
	const doc = await Product.findById(id).select('name price _id').exec()
	try {
		if (doc) {
			const response = {
				message: 'Product Found',
				product: {
					name: doc.name,
					price: String(doc.price),
					id: doc._id,
				}
			}
			console.log('Get product by id', response)
			return response
		} else {
			const response = {
				message: 'No valid Entry Found '
			}
			return response
		}
	} catch (err) {
		if (err instanceof mongoose.CastError) {
			const response = {
			  message: 'Invalid ID provided'
			}
			return response;
		  } else {
			// Handle other errors
			console.error(err);
			throw err; // re-throw the error to be handled by the caller
		  }
	}
}

async function createProduct(name, price) {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		price: price,
	})
	const result = await product.save()
	result.price = String(result.price);
	return result
}

async function deleteProductById(id) {
	const result = await Product.findByIdAndDelete(id).exec()
	const response = {
		    id: result._id,
			name: result.name,
			price: result.price
	}
	return response
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	deleteProductById
}