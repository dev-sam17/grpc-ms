const client = require('./client')

// get products
if (false) {
    client.GetProducts({}, (error, response) => {

        console.error('Error', error)
        console.log(response)

    })
}

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

async function randomFunction() {
    try {
        console.log('Getting Products')
        const products = await newFunctionGetProducts()
        console.log(products)
    } catch (error) {
        console.log(error)
    }
}

randomFunction()

// get product by id
if (false) {
    client.GetProductById({
        id: '643186f89eb3ae1c9b9d265a',
    }, (error, response) => {

        console.error('Error', error)
        console.log(response)

    })
}

// create product
if (false) {
    client.CreateProduct({
        name: 'Twilight',
        price: 23.99,
    }, (error, response) => {

        console.error('Error', error)
        console.log(response)

    })
}

// delete product by id
if (false) {
    client.DeleteProductById({
        id: '6436e1deb497ff2fb62e0f1b',
    }, (error, response) => {

        console.error('Error', error)
        console.log(response)

    })
}
