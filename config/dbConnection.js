/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon dbConnection.js              
 * @descrition      : function that connects the server to database
 * @file            : dbConnection.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-Dec-2021
 * 
 **************************************************************************/

//importing required modules
const mongoose = require('mongoose');
const dbconfig = require('./dbConfig');
const logger = require('./logger');
const csvToJson = require('../utility/csvToJson');
const productModel = require('../src/app/model/productModel');
require('dotenv').config();

/**
 * @description functon that makes connection to the database server
 */
exports.dbConnection = () => {
    mongoose.connect(dbconfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database")
        //logg success connection here    
    }).catch(err => {
        //logg error here
        logger.error(err)
        process.exit();
    });

    let connection = mongoose.connection;
    connection.once("open", () => {
        connection.db.listCollections().toArray((error, collectionArray) => {
            if (error) {
                logger.error(error);
            }
            else {
                for (let i = 0; i < collectionArray.length; i++) {
                    if (collectionArray[i].name === 'bookstoreproducts') {
                        connection.db.dropCollection('bookstoreproducts', (error, result) => {
                            if (error) {
                                logger.error(error)
                            }
                            else {
                                logger.info('dropped collection BookStoreProduct');
                                csvToJson.getJsonArry(process.env.CSV_FILE_PATH, (err, data) => {
                                    if (err) {
                                        logger.error(err);
                                    }
                                    else {
                                        data.map((item) => {
                                            productModel.insertOne(item, (err, data) => {
                                                err ?
                                                    logger.error(err) :
                                                    logger.info(data);
                                            })
                                        })
                                    }
                                });
                            }
                        })
                    }
                }
            }
        })
    });
}

