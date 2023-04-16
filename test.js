const client = require('./client')

// get products
function newFunctionGetProducts() {
    return new Promise((resolve, reject) => {
        client.GetProducts({}, (error, response) => {
            if (response) {
                resolve(response)
            } else {
                reject(error)
            }
        })
    })
}


async function getProductsFunction() {
    try {
        console.log('Getting Products')
        const products = await newFunctionGetProducts()
        console.log(products)
    } catch (error) {
        console.log("Error:" + error)
    }
}

// get product by id
function newFunctionGetProductById(id) {
    return new Promise((resolve, reject) => {
        client.GetProductById({id:id}, (error, response) => {
            if (response) {
                resolve(response)
            } else {
                reject(error)
            }
        })
    })
}

async function getProductByIdFunction(id) {
    try {
        console.log('Getting Product By ID')
        const product = await newFunctionGetProductById(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}

// create product
function newFunctionCreateProduct(name, price) {
    return new Promise((resolve, reject) => {
        client.CreateProduct({name: name,
        price: price}, (error, response) => {
            if (response) {
                resolve(response)
            } else {
                reject(error)
            }
        })
    })
}

async function createProductFunction(name, price) {
    try {
        console.log('Creating Product')
        const product = await newFunctionCreateProduct(name, price)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}

// delete product by id
function newFunctionDeleteProduct(id) {
    return new Promise((resolve, reject) => {
        client.DeleteProductById({id: id}, (error, response) => {
            if (response) {
                resolve(response)
            } else {
                reject(error)
            }
        })
    })
}

async function deleteProductFunction(id) {
    try {
        console.log('Deleting Product')
        const product = await newFunctionDeleteProduct(id)
        console.log(product)
    } catch (error) {
        console.log('Error : ' + error)
    }
}









// getProductsFunction()
// getProductByIdFunction("6436e1a88e185939f6e100f5")
// createProductFunction('Game of Thrones', '23.99')
// deleteProductFunction('6436bcd2f7803f1509a94a50')