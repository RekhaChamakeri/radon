const userModel= require("../models/userModel")
const productModel= require("../models/productModel")
const orderModel= require("../models/orderModel")

const createProduct= async function (req, res) {
    let data=req.body
    let savedData= await productModel.create(data)
    res.send({msg: savedData})
}


//..........................................................................02.....................................................................

/*- Write a POST api to create a user that takes user details from the request body. If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header */


const createUser= async function (req, res) {
    let data=req.body
    let savedData= await userModel.create(data)
    res.send({msg: savedData})
}

//..........................................................................04.....................................................................
/*- Write a POST api for order purchase that takes a userId and a productId in request body. 
If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header*/


const createOrder= async function (req, res) {
    let data=req.body
    let savedData= await orderModel.create(data)
    res.send({msg: savedData})
}




















module.exports.createProduct= createProduct
module.exports.createUser= createUser
module.exports.createOrder= createOrder