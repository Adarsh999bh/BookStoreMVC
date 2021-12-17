/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
//importing required modules
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//creating mongoose schema for BookStoreUser
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
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
    password: String,
  },
  {
    timestamps: true,
  }
);

//creating mongoose model for BookStoreUser
const myUser = mongoose.model("BookStoreUser", userSchema);


class UserModel{

    /**
     * @description finds the user by email and returns the result
     * @param {Object} body 
     * @param {callback} callback 
     * @returns user details
     */
    loginUser = (body,callback)=>{
        return myUser.findOne({email:body.email}, (err,data) => {
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null) : 
            data === null ? 
            callback({
                message:"email ID is not present",
                statusCode:401
            },null) : 
            callback(null,data);
        });
    };

    /**
     * @description creates a new user and returns the same
     * @param {Object} body 
     * @param {callback} callback 
     * @returns newly registered user
     */
    createUser = (body,callback)=>{
        let encryptedPassword=bcrypt.hashSync(body.password,10);
        let user=new myUser({
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            email: body.email,
            password: encryptedPassword
        });
        return user.save((err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null) : 
            callback(null,data);
        });
    };

    /**
     * @description resetsthe password for user
     * @param {String} userID 
     * @param {Object} body 
     * @param {callback} callback 
     */
    reset=(userID,body,callback)=>{
        let encryptedPassword=bcrypt.hashSync(body.password,10);
        myUser.findByIdAndUpdate(
            userID,
            {
                password:encryptedPassword
            },
            {
                new:true
            },
            (err,data)=>{
                err ?
                callback({
                    message:err,
                    statusCode:500
                },null):
                callback(null,data);
            }
        );
    };

    /**
     * @description updates the user details by userId
     * @param {String} userID 
     * @param {Object} body 
     * @param {callback} callback 
     */
    updateUser = (userID,body,callback) => {

        myUser.findByIdAndUpdate(
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
                  message:err,
                  statusCode:500
              }, null) : 
              callback(null, data);
            }
        );
    };

    /**
     * @description finds the user based on userId and deletes the same
     * @param {String} userID 
     * @param {callback} callback 
     * @returns removed collection entry
     */
    deleteUser = (userID,callback) => {
        return myUser.findByIdAndRemove(userID,(err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null):
            callback(null,data);
        });
    };

    /**
     * finds the user based on email
     * @param {String} email 
     * @param {callback} callback 
     * @returns user details
     */
    getUser = (email,callback) =>{
        return myUser.findOne({email:email},(err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null): 
            data===null ? 
            callback({
                message:"email not found",
                statusCode:404
            },null):
            callback(null,data);
        });
    };
}

//exportinf UserModel
module.exports=new UserModel();