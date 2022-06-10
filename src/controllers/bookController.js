const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")

//................................................................01 and02................................................

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await authorModel.create(author)
    res.send({data: authorCreated})
}
const createPublisher= async function (req, res) {
    let publisher = req.body
    let bookCreated = await publisherModel.create(publisher)
    res.send({data: bookCreated})
}
//.................................................................03.................................................

const createBook= async function (req, res) {
    
    //let pId= await publisherModel.find().select({_id:1})
    let book = req.body

    if(!book.author_id)
     {
       return  res.send({msg: "Id is required"})
     }
     let id= await authorModel.findById(book.author_id)
     if(!id){ res.send("author_id is not valid")}
     
     if(!book.publisher_id)
     {
       return  res.send({msg: "Id is required"})
     }
     let pId= await publisherModel.findById(book.publisher_id)
     if(!pId){ res.send("publisher_id is not valid")}

    
     
    let bookCreated = await bookModel.create(book)
    res.send({msg:"Id is valid",data:bookCreated})
    }   


//...................................................................04................................................................

const getBooksData = async function (req, res) {
    let booksData = await bookModel.find().populate(["author_id","publisher_id"])
    res.send({data: booksData})

}

//..................................................................05...................................................................

const putBooksData= async function (req, res) {
    let publisherId = await publisherModel.find({$or:[{name: "Penguin"}, {name: "HarperCollins"}]})

    for (let i=0;i<publisherId.length;i++) {
      let updateKey = await bookModel.updateMany({publisher_id: publisherId[i]._id}, {$set:{isHardCover: true}} )
    res.send({msg: updateKey})
    }
   
}

const putUpdatedPrice=async function(req,res){
  
    let authorId = await authorModel.find({rating:{$gte:3.5}})

     for (let i=0;i<authorId.length;i++) {
      let updatePrice= await bookModel.updateMany({author_id: authorId[i]._id}, {$inc:{price: 10}} )
     res.send({msg: updatePrice})
     }
    
    }

module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.createPublisher= createPublisher
module.exports.getBooksData= getBooksData
module.exports.putBooksData= putBooksData
module.exports.putUpdatedPrice= putUpdatedPrice

