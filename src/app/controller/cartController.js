/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartController.js              
 * @descrition      : manages all te route controls of cart
 * @file            : cartController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const cartService=require('../service/cartService');
const logger=require('../../../config/logger');

class CartService{

    /**
     * @description handles request and response for creating cart
     * @param {Object} req 
     * @param {Object} res 
     */
    createCart=(req,res)=>{
        cartService.createCart(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("create cart successfull");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response update cart
     * @param {Object} req 
     * @param {Object} res 
     */
    updateCart=(req,res)=>{
        cartService.updateCart(req.body.cartId,req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("update cart successfull");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response delete cart
     * @param {Object} req 
     * @param {Object} res 
     */
    deleteCart=(req,res)=>{
        cartService.deleteCart(req.body.productId,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("delete cart successfull");
                res.status(204).send(data);
            }
        })
    }

    /**
     * @description handles request and response delete one
     * @param {Object} req 
     * @param {Object} res 
     */
    deleteOne=(req,res)=>{
        cartService.deleteOne(req.body.productId,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("delete one successfull");
                res.status(204).send(data);
            }
        })
    }

    /**
     * @description handles request and response to get the cart of user
     * @param {Object} req 
     * @param {Object} res 
     */
    getCartForUser=(req,res)=>{
        cartService.getItemsInCart(req.body._id,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("get cart items successfull");
                res.status(200).send(data);
            }
        })
    }
}

module.exports=new CartService();