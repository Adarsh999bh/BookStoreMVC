/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon userMiddleware.js              
 * @descrition      : verifies the jwt token coming from the client request
 * @file            : userMiddleware.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Dec-2021
 * 
 **************************************************************************/
const jwt=require('../../../utility/jwt');

class Middleware{
    verifyJwt=(req,res,next)=>{
        let bearerToken = req.headers.authorization || req.params.token;
        if(!bearerToken){
            res.status(401).send("Unauthorized request");
        }
        else{
            jwt.verifyToken(bearerToken.split(" ")[1],(err,data)=>{
                if(err){
                    res.status(401).send(err);
                }
                else{
                    req.body._id=data._id;
                    next();
                }
            });
        }
    };
}

module.exports=new Middleware();