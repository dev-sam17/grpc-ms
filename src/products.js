const mongoose = require('mongoose');
const { primaryDb, db } = require('./db')
const productSchema = require('./productSchema')

primaryDb()

async function getProducts() {
	const Product = db.model('Product', productSchema);
	const docs = await Product.find().select('name price _id').exec()

	const response = docs.map(doc => {
		return {
			name: doc.name,
			price: String(doc.price),
			id: doc._id,
		}
	})
	console.log(response)
	return response
}


async function getProductById(id, useDb = db) {
	try {
		const Product = useDb.model('Product', productSchema);
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
	} catch (error) {
		if (error instanceof mongoose.CastError) {
			console.log('cast error')
			const response = {
			  message: 'Invalid ID provided'
			}
			return response;
		  } else {
			// Handle other errors
			console.error(error);
			// throw err; // re-throw the error to be handled by the caller
			const response = {
				code: error.code,
				message: error.message || 'Some error occured'
			}
			return response;
		}
	}
}


async function createProduct(name, price, useDb = db) {
	const Product = useDb.model('Product', productSchema)
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		price: price,
	})
	const result = await product.save()
	result._doc.price = String(result._doc.price)
	console.log(result)
	return result
}


async function deleteProductById(id, useDb = db ) {
	const Product = useDb.model('Product', productSchema)
	const result = await Product.findByIdAndDelete(id).exec()
	const response = {
		    id: result._id,
			name: result.name,
			price: String(result.price)
	}
	console.log(response)
	return response
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	deleteProductById
}