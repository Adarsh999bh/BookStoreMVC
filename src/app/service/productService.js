const productModel=require('../model/productModel');

class productService{
    getProducts=(index,callback)=>{
        productModel.getAllbooks((err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data.slice(index,index+12))
            }
        })
    }
}
module.exports=new productService();