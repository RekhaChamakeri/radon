const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.get("/test-me2", function (req, res) {
    res.send("Hi I am checking todays date here!")
})
router.get("/test-me3", function (req, res) {
    res.send("Hi, Its 2nd api to check time!")
})

module.exports = router;