const express = require('express');
const { indexOf } = require('lodash');
const lodash = require('lodash');

const router = express.Router();
//....................................................nodejs module assignment problem no:4....................................................
router.get('/hello', function (req, res) {
    const data = ["jan", "feb", "march", "apr", "may", "june", "july", "august", "sept", "oct", "nov", "dec"];
    const chunks = lodash.chunk(data, 4);
    console.log(chunks);

    const oddNum =[1,3,5,7,9,11,13,15,17,19]
    const lastElements = lodash.tail(oddNum);
    console.log(lastElements)

    const arr1=[1,4,2,4,6]
    const arr2=[6,12,18,3]
    const arr3=[1,8,6,22,30]
    const arr4=[8,5,22,26,13]
    const arr5=[40,33,5,27,15]
    const mergedArray=lodash.union(arr1,arr2,arr3,arr4,arr5)
    console.log(mergedArray)

    let pairs = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    let obj = lodash.fromPairs(pairs);
    console.log(obj)

   res.send('Hello there,Its my API')
 });

//........................................................ 1 .................................................................
 router.get('/param', function (req, res) {
   const movies=["3Idiots","kgf","RRR","googli"]
   res.send(movies)
});

//.........................................................2 and 3...................................................................
router.get('/movies/:indexNumber', function (req, res) {
  const movies=["3Idiots","kgf","RRR","googli"]
  JSON.stringify(req.params)
  let len=movies.length
  let movieName=movies[req.params.indexNumber]
  if(req.params.indexNumber<len){
    res.send(movieName)
 }
 else{
res.send("error: there is no such movie")
 }
 });
 
//.....................................................................4..................................................
 router.get('/film/:filmId', function (req, res) {
   const film=[ {
    "id": 1,
    "name": "The Shining"
   }, {
    "id": 2,
    "name": "Incendies"
   }, {
    "id": 3,
    "name": "Rang de Basanti"
   }, {
    "id": 4,
    "name": "Finding Nemo"
   }]
   JSON.stringify(req.params)
   const len= film.length
   const filmObj=film[req.params.filmId]
   if(req.params.filmId<len){
    res.send(filmObj)
 }
 else{
res.send(film)
 }
    
  });

module.exports = router;
