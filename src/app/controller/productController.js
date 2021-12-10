/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon productController.js              
 * @descrition      : manages all te route controls of product
 * @file            : productController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const productService=require('../service/productService');
const logger=require('../../../config/logger');

class ProductController{
    getProducts=(req,res)=>{
        productService.getProducts(req.params.index,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("create product successfull");
                res.status(200).send(data);
            }
        })
    }
    updateProducts=(req,res)=>{
        productService.updateProduct(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("update product successfull");
                res.status(200).send(data);
            }
        })
    }
    insertProduct=(req,res)=>{
        productService.insertProduct(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("update product successfull");
                res.status(200).send(data);
            }
        })
    }
}
module.exports=new ProductController();