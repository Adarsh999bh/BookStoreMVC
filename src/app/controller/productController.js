const productService=require('../service/productService');

class productController{
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
}
module.exports=new productController();