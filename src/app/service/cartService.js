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
    getItemsInCart = (userId, callback) => {
        cartModel.getItemsInCart(userId, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null,data.map((item)=>{
                    let obj={}
                    obj.quantity=item.quantity;
                    obj._id=item.prodObjId;
                    obj.productTitle=item.product[0].productTitle;
                    obj.price=item.product[0].price;
                    obj.author=item.product[0].author;
                    obj.image=item.product[0].image;
                    return obj;
                }));
            }
        })
    }
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

module.exports = new CartService();