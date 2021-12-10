/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartRoutes.js              
 * @descrition      : specifies all the user routes
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
    (req,res)=>{

    }
);

cartRoute.put(
    "/update-cart",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);

cartRoute.get(
    "/get-cart-items",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);

cartRoute.delete(
    "/delete-cart",
    Middleware.verifyJwt,
    (req,res)=>{

    }
);

module.exports=cartRoute;