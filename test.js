const client = require('./client')


// get products
async function testGetProducts() {
    try {
        console.log('Getting Products')
        const products = await client.GetProducts()
        console.log(products)
    } catch (error) {
        console.log("Error:" + error)
    }
}

// get product by id
async function testGetProductById(id) {
    try {
        console.log('Getting Product By ID')
        const product = await client.GetProductById(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}


// create product
async function testCreateProduct(name, price) {
    try {
        console.log('Creating Product')
        const product = await client.CreateProduct(name, price)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}

// delete product by id
async function testDeleteProduct(id) {
    try {
        console.log('Deleting Product')
        const product = await client.DeleteProduct(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}


// testGetProducts()
// testGetProductById("643bbb184bcf661be1f8f991")
testCreateProduct('The Hobbits', '24.99')
// testDeleteProduct('643186f89eb3ae1c9b9d265a')