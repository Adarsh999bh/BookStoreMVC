/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon addressModel.js              
 * @descrition      : set up the Model for address and performs all the db operations
 * @file            : addressModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookStoreUser",
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true,
    },
    pincode: {
        type: String
    },
    locality: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    landmark: {
        type: String
    },
    addressType: {
        type: String,
        default: "Home"
    }
})

const address = mongoose.model("BookStoreAddress", addressSchema);

class addressModel {
    createAddress = (body, callback) => {
        address.findOne({ userId: body._id }, (err, data) => {
            let addressData = new address({
                userId: body._id,
                userName: body.userName,
                addressType: body.addressType,
                landmark: body.landmark,
                city: body.city,
                address: body.address,
                locality: body.locality,
                pincode: body.pincode,
                phNo: body.phNo
            })
            if (err) {
                callback(err, null);
            }
            else {
                if (!data) {
                    addressData.save((err, data) => {
                        err ?
                            callback(err, null) :
                            callback(null, data);
                    })
                }
                else {
                    address.findOneAndUpdate(
                        { userId: body._id },
                        {
                            userId: body._id,
                            userName: body.userName,
                            addressType: body.addressType,
                            landmark: body.landmark,
                            city: body.city,
                            address: body.address,
                            locality: body.locality,
                            pincode: body.pincode,
                            phNo: body.phNo
                        },
                        { new: true },
                        (err, data) => {
                            err ?
                                callback(err, null) :
                                callback(null, data);
                        }
                    )
                }
            }
        })
    }
    getAddress = (userId, callback) => {
        address.findOne(
            { userId: userId },
            (err, data) => {
                err ?
                    callback(err, null) :
                    callback(null, data);
            }
        )
    }
}
module.exports=new addressModel();