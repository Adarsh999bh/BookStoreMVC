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
        isWishList: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


const cart = mongoose.model("BookStoreCart", cartSchema);

class CartModel {
    insertCart = (body, callback) => {
        let currentCart = new cart({
            userId: body._id,
            productId: body.productId,
            quantity: body.quantity,
            cartStatus: body.cartStatus,
            isWishList: body.isWishList,
        });
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
                userId: body._id,
                productId: body.productId,
                quantity: body.quantity,
                cartStatus: body.cartStatus,
                isWishList: body.isWishList,
            },
            { new: true },
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            }
        )
    }
    deletecart = (productId, callback) => {
        cart.deleteMany({ productId: productId }, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
    deleteOne = (productId, callback) => {
        cart.findOneAndDelete({ productId: productId }, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
    getItemsInCart = (userId, callback) => {
        cart.aggregate([
            {
                $match: {
                    $and: [
                        { userId: new mongoose.Types.ObjectId(userId) },
                        { isWishList: false }
                    ]
                }
            },
            {
                $group: {
                    _id: "$productId", quantity: { $sum: "$quantity" }
                }
            },
            {
                $project: {
                    prodObjId: { "$toObjectId": "$_id" },
                    quantity: 1,
                    _id: 0
                }
            },
            {
                $lookup: {
                    from: "bookstoreproducts",
                    localField: "prodObjId",
                    foreignField: "_id",
                    as: "product"
                }
            }
        ])
            .then(data => {
                callback(null, data)
            }).catch(err => {
                callback(err, null)
            })
    }
}
module.exports = new CartModel();