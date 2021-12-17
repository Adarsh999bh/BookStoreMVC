/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon productController.js              
 * @descrition      : manages all te route controls of product
 * @file            : productController.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
//importing required modules
const productService=require('../service/productService');
const logger=require('../../../config/logger');

class ProductController{
    /**
     * @description handles request and response to get the products
     * @param {Object} req 
     * @param {Object} res 
     */
    getProducts=(req,res)=>{
        productService.getProducts(req.params.index,req.params.sortid,(err,data)=>{
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

    /**
     * @description handles request and response to update product
     * @param {Object} req 
     * @param {Object} res 
     */
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

    /**
     * @description handles request and response for insert product
     * @param {Object} req 
     * @param {Object} res 
     */
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

    /**
     * @description handles request and response to get book by id
     * @param {Object} req 
     * @param {Object} res 
     */
    getBookById=(req,res)=>{
        productService.getBookById(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("get book by id succussfull");
                res.status(200).send(data);
            }
        })
    }

    /**
     * @description handles request and response to search book
     * @param {Object} req 
     * @param {Object} res 
     */
    searchBook=(req,res)=>{
        productService.searchBooks(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("search book succussfull");
                res.status(200).send(data);
            }
        })
    }
}
module.exports=new ProductController();