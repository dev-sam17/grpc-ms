const client = require('./client')


    //get all products
// client.GetProducts({}, async (error, response) => {
//     try {
//         console.log(response)
//     } catch (error) {
//         return error
//     }
// })


// get product by id
// client.GetProductById({
//     id: '643186f89eb3ae1c9b9d265a',
// }, async (error, response) => {
//     try {
//         console.log(response)
//     } catch (error) {
//         return error
//     }
// })

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
client.DeleteProductById({
    id: '6436c060dc48a738132ea917',
}, async (error, response) => {
    try {
        console.log(response)
    } catch (error) {
        return error
    }
})