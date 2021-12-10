/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon cartModel.js              
 * @descrition      : set up the Model for cart and performs all the db operations
 * @file            : cartModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
const mongoose = require('mongoose');

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


const product = mongoose.model("BookStoreProduct", productSchema);

class productModel {
  insertOne = (obj, callback) => {
    let prod = new product(obj);
    prod.save((err, data) => {
      err ?
        callback(err, null) :
        callback(null, data);
    })
  }
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
  getAllbooks = (callback) => {
    product.find({}, (err, data) => {
      err ?
        callback(err, null) :
        callback(null, data);
    })
  }
}
module.exports = new productModel();
