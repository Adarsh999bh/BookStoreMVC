/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-Dec-2021
 * 
 **************************************************************************/

//import express
const express=require('express');

//import cors
const cors=require('cors');

//requires dotenv config
require('dotenv').config();

//import db connection function
const dbconn=require('./config/dbConnection');

//importing custom logger
const logger=require('./config/logger');

//importing user routes
const userRouter=require('./src/app/routes/userRoutes');

//importing product routes
const productRoute=require('./src/app/routes/productRoutes');

//importing cart routes
const cartRouter=require('./src/app/routes/cartRoutes');

//importing order routes
const orderRouter=require('./src/app/routes/orderRoutes');

//importing address routes
const addressRouter=require('./src/app/routes/addressRoutes')

//creating an express app
const app=express();

//adding urlencoded middleware to app
app
.use(express.
    urlencoded({
        extended:false
}));

//adding json middleware to accept and send json objects as req and res
app
.use(express.json());

//adding cors to accept requests from different sources
app.use(cors())

//adding user router to app
app.use('/user',userRouter);

//adding product route to app
app.use('/product',productRoute)

//adding cart routes to app
app.use('/cart',cartRouter);

//adding order route to app
app.use('/order',orderRouter);

//adding address route to app
app.use('/address',addressRouter);

/**
 * @description creates server and listens at specified port also connects the
 *  server to the db
 * db server
 * @param PORT server listens for requests at this port
 * @param callback function that will called to connect to database on successful
 *  creation of server
 */
const server=app.listen(process.env.PORT,()=>{

    dbconn.dbConnection();

    logger.info("server created")
    console.log("server created");

});

//exporting app for api testing
module.exports=app;
