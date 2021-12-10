const productModel=require('../model/productModel');

class ProductService{
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
module.exports=new ProductService();