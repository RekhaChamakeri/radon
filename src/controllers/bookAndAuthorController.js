const { count } = require("console")
//const BookModel= require("../models/bookModel")
const authorsModel= require("../models/authorsModel")
const bookModel = require("../models/bookModel")

//.....................................................01..................................................
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

    
const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await authorsModel.create(data)
    res.send({msg: savedData})
}


//.......................................................02.......................................................

const getBooksByChetanBhagat= async function (req, res) {
    let authorid= await authorsModel.find({author_name:"Chetan Bhagat"}).select("author_id") 
    let bookNames= await bookModel.find({author_id:authorid[0].author_id})
    res.send({msg: bookNames})
}

//........................................................03.......................................................
//find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

const getAuthorAndUpdatedPrice= async function (req, res) {
    let data= await bookModel.findOneAndUpdate({name:"two states"},{$set:{prices:100}},{new:true})
    let authorData= await authorsModel.find({ author_id:data.author_id}).select("author_name") 
    let price=data.prices
    res.send({msg: authorData,price})
}

//.............................................................04............................................................
const getAuthorName= async function (req, res) {
    const bookData= await bookModel.find({prices:{$gte:50,$lte:100}}).select("author_id")
    const id=bookData.map(inp=>inp.author_id)
   let temp=[]
   for(let i=0; i<id.length; i++)
   {
       const x=id[i]
       const author=await authorsModel.find({author_id:x}).select("author_name")
       temp.push(author)
     
   }
   const authorName=temp
   res.send({msg:authorName})
}



    module.exports.createBook= createBook
    module.exports.createAuthor= createAuthor
    module.exports.getBooksByChetanBhagat= getBooksByChetanBhagat
    module.exports.getAuthorAndUpdatedPrice= getAuthorAndUpdatedPrice
    module.exports.getAuthorName= getAuthorName