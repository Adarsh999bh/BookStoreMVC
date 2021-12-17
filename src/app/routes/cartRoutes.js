/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartRoutes.js              
 * @descrition      : specifies all the cart routes
 * @file            : cartRoutes.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

const express=require('express');
const cartRoute=express.Router();
const cartController = require('../controller/cartController');
const Middleware = require('../middleware/userMiddleware');

cartRoute.post(
    "/create-cart",
    Middleware.verifyJwt,
    cartController.createCart
);

cartRoute.put(
    "/update-cart",
    Middleware.verifyJwt,
    cartController.updateCart
);

cartRoute.get(
    "/get-cart-items",
    Middleware.verifyJwt,
    cartController.getCartForUser
);

cartRoute.delete(
    "/delete-cart",
    Middleware.verifyJwt,
    cartController.deleteCart
);
cartRoute.delete(
    "/delete-one",
    Middleware.verifyJwt,
    cartController.deleteCart
);

module.exports=cartRoute;