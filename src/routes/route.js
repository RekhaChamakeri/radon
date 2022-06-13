const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")






router.post("/createUser", commonMW.mid1, userController.createUser )
router.post("/createProduct", userController.createProduct )
router.post("/createOrder",commonMW.mid1,commonMW.mid2,commonMW.mid3, userController.createOrder )








module.exports = router;