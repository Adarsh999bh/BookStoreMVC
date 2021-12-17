/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartModel.js              
 * @descrition      : set up the Model for cart and performs all the db operations
 * @file            : cartModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
//importing required modules
const mongoose = require('mongoose');

//creating productSchema for book store
const productSchema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

//creating productModel
const product = mongoose.model("BookStoreProduct", productSchema);

class ProductModel {
  /**
   * @description inserts a product in productModel
   * @param {Object} obj 
   * @param {callback} callback 
   */
  insertOne = (obj, callback) => {
    let prod = new product(obj);
    prod.save((err, data) => {
      err ?
        callback(err, null) :
        callback(null, data);
    })
  }

  /**
   * @description updates the product details
   * @param {String} productId 
   * @param {Object} body 
   * @param {callback} callback 
   */
  updateOne = (productId, body, callback) => {
    product.findByIdAndUpdate(
      productId,
      {
        ...body
      },
      { new: true },
      (err, data) => {
        err ?
          callback(err, null) :
          callback(null, data);
      }
    )

  }
  
  /**
   * @description gets all products in the model
   * @param {callback} callback 
   */
  getAllbooks = (callback) => {
    product.find({}, (err, data) => {
      err ?
        callback(err, null) :
        callback(null, data);
    })
  }

  /**
   * @description gets book by its id
   * @param {String} bookId 
   * @param {callback} callback 
   */
  getBookById = (bookId, callback) => {
    product.findById(bookId, (err, data) => {
      err ?
        callback(err, null) :
        callback(null, data);
    })
  }
}

//exporting ProductModel
module.exports = new ProductModel();
