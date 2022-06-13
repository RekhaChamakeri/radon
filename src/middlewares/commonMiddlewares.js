const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const mid1= function ( req, res, next) {
    let hdata=req.headers.isfreeappuser
    if(hdata){
    console.log("isFreeAppUser is present")
    next()}
    else{res.send({msg: "the request is missing a mandatory header"})}
}

const mid2= async function ( req, res, next) {
    order=req.body
    userId= await userModel.findById(order.userId)
    if(userId){
        console.log("user exists")
        next()
    }
   else{
    res.send({msg:"user not exist"})
   }
}

 const mid3= async function ( req, res, next) {
    product=req.body
    productId= await productModel.findById(product.productId)
    if(productId){
        console.log("product exists")
        next()
    }
   else{
    res.send({msg:"product not exist"})
   }
}

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
// module.exports.mid4= mid4
