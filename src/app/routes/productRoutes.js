/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon productRoutes.js              
 * @descrition      : specifies all the user routes
 * @file            : productRoutes.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/productController');
const Middleware = require('../middleware/userMiddleware');

productRoute.post(
    "/insert",
    Middleware.verifyJwt,
    productController.insertProduct
);
productRoute.put(
    "/update-product",
    Middleware.verifyJwt,
    productController.updateProducts
);

productRoute.get(
    "/get-products/:index",
    Middleware.verifyJwt,
    productController.getProducts
)
productRoute.get(
    "/get-product",
    Middleware.verifyJwt,
    productController.getBookById
)
productRoute.post(
    "/search",
    Middleware.verifyJwt,
    productController.searchBook
)
module.exports = productRoute;