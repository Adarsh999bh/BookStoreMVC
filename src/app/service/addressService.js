/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon addressService.js              
 * @descrition      : manages all the services for addresses in service layer
 * @file            : addressService.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/

//importing required modules
const addressModel = require("../model/addressModel");

class addressService {
    createAddress = (body, callback) => {
        addressModel.createAddress(body, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
    getAddress = (body, callback) => {
        addressModel.getAddress(body._id, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
}

module.exports=new addressService();