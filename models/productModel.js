// .. meaning we move out of the current folder
// Our Model is essentially the 'data' part of the MVC architecture.And Our source of Data here is the product.json file,so we are going to include it.In some cases it is usually a a database
const products = require('../products.json')
// We use the uuid module to generate random ids.more Info in the documentation, but before that we need to type npm i uuid in the cli because uuid is not a core modulen
const { v4: uuidv4 } = require('uuid')
// We include the WriteDatatoFile function from our utils.js file
const { writeDataToFile } = require('../utils')

// It is said that find is a low level function i must look for what it means
function findAll() {
  // Usually, when we fetch data from a database, or any other data source, since we aren't sure if the data will be sent to the client, it is safe to return a promise

  return new Promise((resolve, reject) => {
    // We are just returning a promise with those products
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

function create(product) {
  return new Promise((resolve, reject) => {
    // Our create function will add an id to the static product passed in parameter and spread out all the other information into the 'newProduct' constant
    const newProduct = { id: uuidv4(), ...product }
    //  Now we add it to the products variable that contains a copy of our JSON file
    products.push(newProduct)
    // Now we need to update the original JSON file by replacing it's content with that of the updated copy... see information about the function used in utils.js file
    writeDataToFile('./products.json', products)
    // We want the newproduct to be sent back to us, so we resolve the newProduct constant
    resolve(newProduct)
  })
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = { id, ...product }
    writeDataToFile('./products.json', products)
    resolve(products[index])
  })
}
function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id)
    writeDataToFile('./products.json', products)
    resolve()
  })
}

// We need to export this since we have to use it in another file

module.exports = { findAll, findById, create, update, remove }
