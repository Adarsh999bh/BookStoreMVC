/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon productRoutes.js              
 * @descrition      : specifies all the user routes
 * @file            : productRoutes.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

const express=require('express');
const productRoute=express.Router();
const productController = require('../controller/productController');
const Middleware = require('../middleware/userMiddleware');

productRoute.post(
    "/insert",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);
productRoute.put(
    "/update-product",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);

productRoute.get(
    "/get-products/:index",
    productController.getProducts
)
module.exports=productRoute;