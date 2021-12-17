/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon orderController.js              
 * @descrition      : manages all te route controls of order
 * @file            : orderController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
//importing required modules
const orderService=require('../service/orderService');
const logger=require('../../../config/logger');

class OrderController{

    /**
     * @description handles request and response to create order
     * @param {Object} req 
     * @param {Object} res 
     */
    createOrder=(req,res)=>{
        orderService.createOrder(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("create order successfull");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response to update order
     * @param {Object} req 
     * @param {Object} res 
     */
    updateOrder=(req,res)=>{
        orderService.updateOrder(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("update order successfull");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response to get all orders history of user
     * @param {Object} req 
     * @param {Object} res 
     */
    getAllOrders=(req,res)=>{
        orderService.getAllorders(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("get all orders successfull");
                res.status(200).send(data);
            }
        })
    }
}

module.exports=new OrderController();