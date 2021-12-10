/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon userModel.js              
 * @descrition      : set up the Model for user and performs all the db operations
 * @file            : userModel.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 8-dec-2021
 * 
 **************************************************************************/
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const user = mongoose.model("BookStoreUser", userSchema);

class userModel {
  createUser = (body, callback) => {
    let encryptedPassword = bcrypt.hashSync(body.password, 10);
    let currentUser = new myUser({
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      email: body.email,
      password: encryptedPassword
    });
    return currentUser.save((err, data) => {
      return err ?
        callback({
          message: err,
          statusCode: 500
        }, null) :
        callback(null, data);
    });
  }
  updateUser = (userID, body, callback) => {
    user.findByIdAndUpdate(
      userID,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        email: body.email,
      },
      {
        new: true
      },
      (err, data) => {
        return err ?
          callback({
            message: err,
            statusCode: 500
          }, null) :
          callback(null, data);
      }
    );
  }
  getUserDetails = (email, callback) => {
    return user.findOne({ email: email }, (err, data) => {
      return err ?
        callback({
          message: err,
          statusCode: 500
        }, null) :
        data === null ?
          callback({
            message: "email not found",
            statusCode: 404
          }, null) :
          callback(null, data);
    });

  }
  deleteUser = (userID, callback) => {
    return user.findByIdAndRemove(userID, (err, data) => {
      return err ?
        callback({
          message: err,
          statusCode: 500
        }, null) :
        callback(null, data);
    });
  }
  loginUser = (body, callback) => {
    return user.findOne({ email: body.email }, (err, data) => {
      return err ?
        callback({
          message: err,
          statusCode: 500
        }, null) :
        data === null ?
          callback({
            message: "email ID is not present",
            statusCode: 401
          }, null) :
          callback(null, data);
    });
  }
}
module.exports = new userModel();