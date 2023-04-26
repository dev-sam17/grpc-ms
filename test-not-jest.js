const client = require('./client')

// Get products
async function testGetProducts() {
    try {
        console.log('Getting Products')
        const products = await client.GetProducts()
        // products.map(product => console.log('This is a product', product))
        console.log(products)
    } catch (error) {
        console.log("Error:" + error)
    }
}

// // Get product by id
// async function testGetProductById(id) {
//     try {
//         console.log('Getting Product By ID')
//         const product = await client.GetProductById(id)
//         console.log(product)
//     } catch (error) {
//         console.log('Error : ' + error)
//     }
// }

// // Create product
// async function testCreateProduct(name, price) {
//     try {
//         console.log('Creating Product')
//         const product = await client.CreateProduct(name, price)
//         console.log(product)
//     } catch (error) {
//         console.log('Error : ' + error)
//     }
// }

// // Delete product by id
// async function testDeleteProduct(id) {
//     try {
//         console.log('Deleting Product')
//         const product = await client.DeleteProductById(id)
//         console.log(product)
//     } catch (error) {
//         console.log('Error : ' + error)
//     }
// }

testGetProducts()
// testGetProductById("643bbb184bcf661be1f8f991")
// testCreateProduct('The Hobbits', '24.99')
// testDeleteProduct('643bbb184bcf661be1f8f991')
