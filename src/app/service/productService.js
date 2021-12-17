/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon productService.js              
 * @descrition      : manages all the services for products in service layer
 * @file            : productService.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

//importing required modules
const productModel = require('../model/productModel');

class ProductService {
    /**
     * @description gets the products based on page index
     * @param {String} index 
     * @param {callback} callback 
     */
    getProducts = (index, callback) => {
        productModel.getAllbooks((err, data) => {
            if (err) {
                callback(err, null);
            }
            else {
                let page = parseInt(index);
                page = (page - 1) * 12;
                callback(null, data.slice(page, page + 12));
            }
        })
    }
    
    /**
     * @description calls the product model insertOne method to insert product
     * @param {Object} body 
     * @param {callback} callback 
     */
    insertProduct = (body, callback) => {
        productModel.insertOne(body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    /**
     * @description updates product model function is called
     * @param {Object} body 
     * @param {callback} callback 
     */
    updateProduct = (body, callback) => {
        productModel.updateOne(body.productId, body.data, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    
    /**
     * @description get method of model is called to get one book by its id
     * @param {Object} body 
     * @param {callback} callback 
     */
    getBookById = (body, callback) => {
        productModel.getBookById(body._id, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    /**
     * @description calls getAllBoook method of product model and searches for the book 
     * which is matching text for the search text sent by request body
     * @param {Object} body 
     * @param {callback} callback 
     */
    searchBooks = (body, callback) => {
        productModel.getAllbooks((err, data) => {
            if (err) {
                callback(err, null);
            }
            else {
                let filteredData = data.filter((item) => {
                    return item.productTitle.toLowerCase().includes(body.searchTxt.toLowerCase());
                })
                callback(null, filteredData);
            }
        })
    }
}

//exporting ProductService
module.exports = new ProductService();