const client = require('./client')

if (false) {
    //get all products
    client.GetProducts({}, async (error, response) => {
        try {
            console.log(response)
        } catch (error) {
            return error
        }
    })
}

// get product by id
client.GetProductById({
    id: '643186f89eb3ae1c9b9d265a',
}, async (error, response) => {
    try {
        console.log(response)
    } catch (error) {
        return error
    }
})

// create product
// client.CreateProduct({
//     name: 'Twilight',
//     price: 23.99,
// }, async (error, response) => {
//     try {
//         console.log(response)
//     } catch (error) {
//         return error
//     }
// })

// delete product by id
// client.DeleteProductById({
//     id: '6435510363f239395b1ee1ca',
// }, async (error, response) => {
//     try {
//         console.log(response)
//     } catch (error) {
//         return error
//     }
// })