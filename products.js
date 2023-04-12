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

// getProductById('6428ee321a4670da495e97bd')
// createProduct("Harry Potter: The Cursed Child", 14.99)
// deleteProductById('6428ee321a4670da495e97bd')

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	deleteProductById
}