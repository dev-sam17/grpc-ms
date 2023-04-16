const client = require('./client')


// get products
async function getProductsFunction() {
    try {
        console.log('Getting Products')
        const products = await client.GetProducts()
        console.log(products)
    } catch (error) {
        console.log("Error:" + error)
    }
}

// get product by id
async function getProductByIdFunction(id) {
    try {
        console.log('Getting Product By ID')
        const product = await client.GetProductById(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}


// create product
async function createProductFunction(name, price) {
    try {
        console.log('Creating Product')
        const product = await client.CreateProduct(name, price)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}

// delete product by id
async function deleteProductFunction(id) {
    try {
        console.log('Deleting Product')
        const product = await client.DeleteProduct(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}


getProductsFunction()
// getProductByIdFunction("643186f89eb3ae1c9b9d265a")
// createProductFunction('Lords of the Rings', '24.99')
// deleteProductFunction('643186f89eb3ae1c9b9d265a')