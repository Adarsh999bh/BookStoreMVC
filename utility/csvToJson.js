/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon csvToJson.js              
 * @descrition      : takes string csv as param and converts it into json array
 * @file            : csvToJson.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-dec-2021
 * 
 **************************************************************************/
const fs=require('fs');

/**
 * @description converts csv string to json array
 * @param {String} csv 
 * @returns result (json array)
 */
const csvJsonArray=(csv)=>{

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If columns contain commas in their values, we need
    // to deal with those before doing the next step 
    // (if comma exists in column then convert them to &&& or something, then 
    //covert them back later)
    var headers=['author','productTitle','image','quantity','price','description']
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=2;j<currentline.length;j++){
            obj[headers[j-2]] = currentline[j];
        }
        result.push(obj);
  
    }
  
    //return result
    return result;
  }

  /**
   * @description reads the csv file and returns the result from csvJsonArray function
   * @param {String} path 
   * @returns result (json array)
   */
  exports.getJsonArry=(path,callback)=>{
      fs.readFile(path,'utf8',(err,data)=>{
          if(err){
              callback(err,null);
          }
          else{
              callback(null,csvJsonArray(data));
          }
      });
  }