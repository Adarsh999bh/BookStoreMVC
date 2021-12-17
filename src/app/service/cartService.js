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
    /**
     * @description creates cart for particular product for specific user
     * @param {Object} body 
     * @param {callback} callback 
     */
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

    /**
     * @description updates the cart details using product id
     * @param {String} productId 
     * @param {Object} body 
     * @param {callback} callback 
     */
    updateCart = (productId, body, callback) => {
        cartModel.updateCart(productId, body, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    /**
     * gets the items in the cart for the specific user in cart model and and 
     * formates the data to required format
     * @param {String} userId 
     * @param {callback} callback 
     */
    getItemsInCart = (userId, callback) => {
        cartModel.getItemsInCart(userId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data.map((item) => {
                    let obj = {}
                    obj.quantity = item.quantity;
                    obj._id = item.prodObjId;
                    obj.productTitle = item.product[0].productTitle;
                    obj.price = item.product[0].price;
                    obj.author = item.product[0].author;
                    obj.image = item.product[0].image;
                    return obj;
                }));
            }
        })
    }

    /**
     * @description deletes the cart by product id 
     * @param {String} productId 
     * @param {callback} callback 
     */
    deleteCart = (productId, callback) => {
        cartModel.deletecart(productId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    /**
     * @description finds one and deletes the cart by product id 
     * @param {String} productId 
     * @param {callback} callback 
     */
    deleteOne = (productId, callback) => {
        cartModel.deleteOne(productId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }
}

//exporting CartSercice
module.exports = new CartService();