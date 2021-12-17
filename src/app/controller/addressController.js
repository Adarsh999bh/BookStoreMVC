/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon addressController.js              
 * @descrition      : manages all te route controls of address
 * @file            : addressController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const addressService=require('../service/addressService');
const logger=require('../../../config/logger');

class AddressController{

    /**
     * @description handles request and response for create address and updates 
     * if address already exists
     * @param {Object} req 
     * @param {Object} res 
     */
    createAddress=(req,res)=>{
        addressService.createAddress(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send("internal server error")
            }
            else{
                logger.info("create or update address successful");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response for get user address
     * @param {Object} req 
     * @param {Object} res 
     */
    getAddress=(req,res)=>{
        addressService.getAddress(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send("internal server error")
            }
            else{
                logger.info("get address successful");
                res.status(200).send(data);
            }
        })
    }
}

module.exports=new AddressController();