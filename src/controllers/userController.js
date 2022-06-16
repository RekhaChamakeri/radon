const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try{
  let data = req.body;
  if ( Object.keys(data).length != 0) {
  let savedData = await userModel.create(data);
  res.status(201).send({ msg: savedData })
  }
  else res.status(400).send({ msg: "BAD REQUEST"})
}
catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
}
};

const loginUser = async function (req, res) {
  try {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });}
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
}
  
};

const getUserData = async function (req, res) {
  try{
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.status(401).send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  res.send({ status: true, data: user });}
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
}
};

const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  //let user = await userModel.findById(userId);
  let userData = req.body
  if ( Object.keys(data).length != 0) {
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },userData,{new:true});
  res.status(200).send({ status: true, data: updatedUser });
}
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch (err) {
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}}

const deleteUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  if(userId){
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{$set:{isDeleted:true}},{new:true});
  res.status(200).send({ status: true, data: updatedUser });
  }
  else res.status(400).send({ msg: "BAD REQUEST"})
}
catch (err) {
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}
};

  


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
