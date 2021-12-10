/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon orderModel.js              
 * @descrition      : set up the Model for order and performs all the db operations
 * @file            : orderModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
//importing mongoose
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BookStoreUser",
            required: true,
        },
        productList: {
            type: Array,
        },
        orderStatus: {
            type: String,
            default: 'pending'
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        modeOfPayment: {
            type: String,
            default: 'COD'
        }
    },
    {
        timestamps: true,
    }
);
const order = mongoose.model('BookStoreOrderDetail', orderSchema);

class orderModel {
    createOrder = (orderId, body, callback) => {
        let currentOrder = new order({
            ...body,
            orderId: orderId,
        })
        currentOrder.save((err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
    updateOrder = (orderId, body, callback) => {
        order.findByIdAndUpdate(
            orderId,
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
    getAllOrderHistory = (userId, callback) => {
        order.find(
            {
                userId: userId
            },
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            })
    }
}
module.exports = new orderModel();