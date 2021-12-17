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

    /**
     * @description addes address to the address model
     * @param {Object} body 
     * @param {callback} callback 
     */
    createAddress = (body, callback) => {
        addressModel.createAddress(body, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }

    /**
     * @description gets the previous updated address of user
     * @param {Object} body 
     * @param {callback} callback 
     */
    getAddress = (body, callback) => {
        addressModel.getAddress(body._id, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        })
    }
}

//exporting addressService
module.exports=new addressService();