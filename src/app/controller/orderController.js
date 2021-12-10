/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon orderController.js              
 * @descrition      : manages all te route controls of order
 * @file            : orderController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const orderService=require('../service/orderService');
const logger=require('../../../config/logger');

class OrderController{
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
    updateOrder=(req,res)=>{
        orderService.updateOrder(req.orderID,req.body,(err,data)=>{
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