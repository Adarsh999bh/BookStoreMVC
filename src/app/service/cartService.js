/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartService.js              
 * @descrition      : manages all the services for carts in service layer
 * @file            : cartService.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

//importing required modules
const cartModel = require("../model/cartModel");

class CartService {
    createCart = (body, callback) => {
        cartModel.insertCart(body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    updateCart = (cartId, body, callback) => {
        cartModel.updateCart(cartId, body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    getItemsInCart = (userId, callback) => {
        cartModel.getItemsInCart(userId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
    deleteCart = (cartId, callback) => {
        cartModel.deletecart(cartId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
}

module.exports = new CartService();