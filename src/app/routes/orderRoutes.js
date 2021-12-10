/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon orderRoutes.js              
 * @descrition      : specifies all the order routes
 * @file            : orderRoutes.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

const express=require('express');
const orderRoute=express.Router();
const orderController = require('../controller/orderController');
const Middleware = require('../middleware/userMiddleware');

orderRoute.post(
    "/create-order",
    Middleware.verifyJwt,
    orderController.createOrder
);

orderRoute.get(
    "/get-orders",
    Middleware.verifyJwt,
    orderController.getAllOrders
)

orderRoute.put(
    "/update-order",
    Middleware.verifyJwt,
    orderController.updateOrder
);

module.exports=orderRoute;