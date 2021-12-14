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
    getProducts = (index, callback) => {
        productModel.getAllbooks((err, data) => {
            if (err) {
                callback(err, null);
            }
            else {
                let page=parseInt(index);
                page=(page-1)*12;
                callback(null, data.slice(index, index + 12));
            }
        })
    }
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
    getBookById=(body,callback)=>{
        productModel.getBookById(body._id,(err,data)=>{
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
}
module.exports = new ProductService();