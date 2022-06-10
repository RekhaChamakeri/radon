const express = require('express');
const router = express.Router();


const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createAuthor", bookController.createAuthor  )
router.post("/createBook", bookController.createBook )
router.post("/createPublisher", bookController.createPublisher )
router.get("/getBooksData", bookController.getBooksData )
router.put("/putBooksData", bookController.putBooksData  )
router.put("/putUpdatedPrice", bookController.putUpdatedPrice  )
module.exports = router;