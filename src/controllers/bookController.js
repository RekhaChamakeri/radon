const { count } = require("console")
const BookModel= require("../models/bookModel")
//...............................................................01.......................................
//createBook : to create a new entry..use this api to create 11+ entries in your collection

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


//.................................................................02................................
//bookList : gives all the books- their bookName and authorName only 

const bookList= async function (req, res) {
    let allBooks= await BookModel.find({},["bookName","authorName"])
    res.send({msg: allBooks})
}



//................................................................03...........................................
//getBooksInYear: takes year as input in post request and gives list of all books published that year

const getBooksInYear= async function (req, res) {
    JSON.stringify(req.params)
    let a=req.params.inputYear
    let allBooks= await BookModel.find( {year: {$eq:a}} ) // AND
    res.send({msg: allBooks})
}


//...................................................................04.............................................
//getBooksInYear: takes year as input in post request and gives list of all books published that year
// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
// e.g if body had { name: “hi”} then you would fetch the books with this name
// if body had { year: 2020} then you would fetch the books in this year
// hence the condition will differ based on what you input in the request body

const getParticularBooks= async function (req, res) {
    let allBooks= await BookModel.find(req.query) 
    res.send({msg: allBooks})
}



//.........................................................................05..............................................
//getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 

const getXINRBooks= async function (req, res) {
    let allBooks= await BookModel.find( { 
             $or: [ {"prices.indianPrice" : "100INR" } , { "prices.indianPrice" : "200INR" } , {  "prices.indianPrice" : "500INR" }]
         } ) // AND
   res.send({msg: allBooks})
 }
   


//.........................................................................06................................................
//getRandomBooks - returns books that are available in stock or have more than 500 pages 

const getRandomBooks= async function (req, res) {
    let allBooks= await BookModel.find( { 
            $or: [{ stockAvailable : true } , {  "totalPages": {$gt:500} }]} ) 
    res.send({msg: allBooks})
}
   
// let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
    // } ).select( { bookName: 1, authorName: 1, _id: 0})n // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


    //  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
    //  let allBooks= await BookModel.findOne( {sales: 10}) 
    //  let allBooks= await BookModel.find( {sales: 10}) 
    
    

    // //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  sales: {$gt: 10}  }, //condition
    //     { $set: { isPublished: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
    // let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
    // let allBooks= await BookModel.find( { bookName:  /5$/  }) 
    // let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 
    
    // ASYNC AWAIT
    
    
    //let allBooks= await BookModel.find( )  //normally this is an asynchronous call..but await makes it synchronous


    // WHEN AWAIT IS USED: - database + axios
    //  AWAIT can not be used inside forEach , map and many of the array functions..BE CAREFUL
    
    
 


module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks