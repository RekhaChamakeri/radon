const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, xyz) {
  let data = req.body;
  let savedData = await userModel.create(data);
  // data.anything="something"
  // console.log(req.newAttribute);
  xyz.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
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
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  res.send({ status: true, data: user });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  let userData = req.body
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },userData,{new:true});
  res.send({ status: true, data: updatedUser });
};

const deleteUser = async function (req, res) {
  
  let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{$set:{isDeleted:true}},{new:true});
  res.send({ status: true, data: updatedUser });
 
  };

  


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
