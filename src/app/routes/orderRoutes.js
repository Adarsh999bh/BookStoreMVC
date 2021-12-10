/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon orderRoutes.js              
 * @descrition      : specifies all the user routes
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
    (req,res)=>{

    }
);

orderRoute.get(
    "/get-orders",
    Middleware.verifyJwt,
    (req,res)=>{

    }
)

orderRoute.put(
    "/update-order",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);

module.exports=orderRoute;