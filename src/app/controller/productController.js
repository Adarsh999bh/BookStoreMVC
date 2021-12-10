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

class ProductController{
    getProducts=(req,res)=>{
        productService.getProducts(req.params.index,(err,data)=>{
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(data);
            }
        })
    }
    updateProducts=(req,res)=>{

    }
    insertProduct=(req,res)=>{

    }
}
module.exports=new ProductController();