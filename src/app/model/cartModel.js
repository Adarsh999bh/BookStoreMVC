/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartModel.js              
 * @descrition      : set up the Model for cart and performs all the db operations
 * @file            : cartModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
//importing required modules
const mongoose = require('mongoose');

//creating cart schema
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

//creating cart model
const cart = mongoose.model("BookStoreCart", cartSchema);

class CartModel {

    /**
     * @description inserts a item into cart
     * @param {Object} body 
     * @param {callback} callback 
     */
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
    /**
     * @description updates the cart
     * @param {String} cartId
     * @param {Object} body 
     * @param {callback} callback 
     */
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

    /**
     * @description deletes the item in cart by product id
     * @param {String} productId 
     * @param {callback} callback 
     */
    deletecart = (productId, callback) => {
        cart.deleteMany({ productId: productId }, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }

    /**
     * @description deletes the item in cart by product Id
     * @param {String} productId 
     * @param {callback} callback 
     */
    deleteOne = (productId, callback) => {
        cart.findOneAndDelete({ productId: productId }, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }

    /**
     * @description aggregates the cart data by user id and also uses 
     * lookup to frtch details of product
     * @param {String} userId 
     * @param {callback} callback 
     */
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

//exporting CartModel
module.exports = new CartModel();