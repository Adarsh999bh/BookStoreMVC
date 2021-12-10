/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartModel.js              
 * @descrition      : set up the Model for cart and performs all the db operations
 * @file            : cartModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BookStoreUser",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BookStoreProduct",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        cartStatus: {
            type: String,
            default: 'open',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const cart = mongoose.model("BookStoreCart", cartSchema);

class cartModel {
    insertCart = (body, callback) => {
        let currentCart = new cart(body);
        currentCart.save((err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
    updateCart = (cartId, body, callback) => {
        cart.findByIdAndUpdate(
            cartId,
            {
                ...body
            },
            { new: true },
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            }
        )
    }
    deletecart = (cartId, callback) => {
        cart.findByIdAndDelete(
            cartId,
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            }
        )
    }
    getItemsInCart = (userId, callback) => {
        cart.find(
            { userId: userId },
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            }
        )
    }
}
module.exports = new cartModel();