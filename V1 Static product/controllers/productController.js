// Now we have to use the data from the model so we include it
const Product = require('../models/productModel')
// 17: 00 I haven't understtod every thing here but we are going to use an asynchronous function

// @ desc Gets All Products
// @route GET api/products/

async function getProducts(req, res) {
  try {
    // We wait for the products that commes from the promise in our Model, its an asynchronous function because remmemmber its a promise... it may be resolved or not. SO we don't want it to block the execution on the server in case the promise is not resolved
    const products = await Product.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

// @ desc Gets single product
// @route GET api/products/:id

async function getProduct(res, id) {
  try {
    // if product doesn't exist
    const product = await Product.findById(id)
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// @ desc Create a product
// @route POST api/products

async function createProduct(req, res) {
  try {
    // SO basically here we created a static product, but without the id.It will be generated and added in the productModel.But normally the data from the product is to be retreived through the body
    const product = {
      title: 'Test Product',
      description: 'This is my Product',
      price: 100,
    }
    // After adding the Id we then add the new product to the JSON file, more information in the productModel file
    const newProduct = await Product.create(product)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

// NOw we need to export this function

module.exports = {
  getProducts,
  getProduct,
  createProduct,
}
