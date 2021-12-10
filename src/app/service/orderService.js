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
const orderModel = require('../model/orderModel');

class OrderService {
    createOrder = (body, callback) => {

        //generate random orderID
        let orderID = ''

        orderModel.createOrder(orderID, body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    updateOrder = (orderID, body, callback) => {
        orderModel.updateOrder(orderID, body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    getAllorders = (body, callback) => {
        orderModel.getAllOrderHistory(body.userID, (err, callback) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
}

module.exports = new OrderService();