const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");

const mid1= async function ( req, res, next) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (token) 
  {
    next()
  }else
  {return res.send({ status: false, msg: "token must be present" });}
  
} 
  
const mid2= async function ( req, res, next) {  
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (user) {
    next()}
    else{
    return res.send("No such user exists");
  }
  };

  const mid3= async function ( req, res, next) { 
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    let decodedToken = jwt.verify(token, 'functionup-radon')

   if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
    //userId for which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId
    //userId comparision to check if the logged-in user is requesting for their own data
    if( userToBeModified==userLoggedIn){
      next()
    }else{ return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})}
  }
   
module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3