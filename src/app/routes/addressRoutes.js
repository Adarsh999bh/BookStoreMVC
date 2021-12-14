/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon addressRoutes.js              
 * @descrition      : specifies all the address routes
 * @file            : addressRoutes.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

const express=require('express');
const addressRoute=express.Router();
const Middleware = require('../middleware/userMiddleware');
const addressController=require('../controller/addressController');


addressRoute.post(
    "/create-address",
    Middleware.verifyJwt,
    addressController.createAddress
);
addressRoute.get(
    "get-address",
    Middleware.verifyJwt,
    addressController.getAddress
)

module.exports=addressRoute;