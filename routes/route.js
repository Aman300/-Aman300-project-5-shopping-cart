const express = require('express')
const Router = express.Router()

const {signUp,logIn} = require('../controllers/userController')
const {productSearch,createProduct, getProduct, createProductPage, deleteProduct, editProduct,postEditProduct} = require('../controllers/productController')
const {addToCart, getCart, deleteCartItem, deleteAllCartItem} = require('../controllers/cartController')

// Router.post('/signUp', signUp)
// Router.post('/logIn', logIn)



Router.get('/', getProduct)


Router.post('/productSearch', productSearch)


Router.post('/createProduct', createProduct)
Router.post('/postEditProduct/:id', postEditProduct)
Router.get('/createProductPage',createProductPage)
Router.get('/deleteProduct/:id', deleteProduct)
Router.get('/editProduct/:id', editProduct)


Router.get('/getCart',getCart)
Router.get('/addToCart/:id', addToCart)
Router.get('/deleteCartItem/:id', deleteCartItem)
Router.get('/deleteAllCartItem/:id', deleteAllCartItem)
   



module.exports = Router
