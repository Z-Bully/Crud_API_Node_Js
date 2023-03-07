// Including HTTP core module
const http = require('node:http')
// Kickstartting server
// Nb i had an error when i wrote createserver instead of createServer... camel naming must be respected as much as possible

//========================= Now suppose we want to reply with an HTML page...
// const server = http.createServer((req, res) => {
//   // Set the HTTP response
//   //   res.statusCode = 200
//   //   res.setHeader

//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.write('<h1>Hello Savitar</h1>')
//   res.end('okay')
// })

//============================Now suppose we want to reply wuth a JSON file instead
// First we will need to include the products file
const products = require('./products')

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   //   By default, your browser will just display it in a non JSON format.we need to change that using JSON.stringify (products).We don't have to stringify it in express though... it does it for us
//   //   Also we can directly put our response in res.end() instead of putting in res.write() first
//   res.end(JSON.stringify(product))
// })

// The Issue with this code above is no matter the request that will be made to the server and no matter the response, it will ALWAYS render the same result, simply beacause we havent placed conditionals.... so we are going to change that...

// Basically we are going to make the 'READ PORTION Of our API'

// const server = http.createServer((req, res) => {
//   if (req.url === '/api/product' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(product))
//   }
//   //   Now We need to define what happens if the wronh URL or the wrong method is used... or else the server will juste keep pending... since it will not know what to do
//   else {
//     res.writeHead(401, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify({ message: 'Route not found' }))
//   }
// })

// From now on we will split the code into models and controllers...

// We need to include the getProduct function from the product Controller file

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController')

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
    // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.end(JSON.stringify(products))
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    // Ie If the requested URL matches the above format given by the regular expression above, and its a get method,split it into an array and return the 3rd element which corresponds to the Id
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } else if (req.url.match(/\/api\/products/) && req.method === 'POST') {
    createProduct(req, res)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3]
    deleteProduct(req, res, id)
  }
  //   Now We need to define what happens if the wrong URL or the wrong method is used... or else the server will juste keep pending... since it will not know what to do
  else {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

// Assign to our API the default port givien by it's environment. If not let it be in PORT 5000 instead
const PORT = process.env.PORT || 5000

// Now that it's listening indicate on which port the server or entry point is running
server.listen(PORT, () => console.log('Server is running on port : ' + PORT))
