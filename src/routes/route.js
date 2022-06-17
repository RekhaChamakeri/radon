const express = require('express');
const router = express.Router();
const Cowin1Controller= require("../controllers/cowin1Controller")



router.get("/cowin/getDistrictsById", Cowin1Controller.getDistrictsById)
router.get("/getweather", Cowin1Controller.getweather)
router.get("/getSortedCities", Cowin1Controller.getSortedCities)
router.post("/createMeme", Cowin1Controller.createMeme)



module.exports = router;