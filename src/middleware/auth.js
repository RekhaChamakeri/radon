//const orderModel = require("../models/orderModel")
//const userModel = require("../models/userModel")
const userModel = require("../models/userModel")

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
   
module.exports.mid1= mid1
module.exports.mid2= mid2