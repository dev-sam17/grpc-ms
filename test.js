const client = require('./client')

// get products
if (true) {
    client.GetProducts({}, (error, response) => {

        console.error('Error', error)
        console.log(response)

    })
}

async function newFunctionGetProducts() {
    //
}

async function randomFunction() {
    console.log('something here')
    const products = await newFunctionGetProducts()
    
    //
    console.log('processing after getting products')
    //
}

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
