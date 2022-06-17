let axios = require("axios")

let getDistrictsById = async function (req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        console.log(`query params are: ${district} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data})//.main["temp"] })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getweather = async function (req, res) {
    try {
        let city = req.query.city
        let key = req.query.appid
        //console.log(`query params are: ${district} ${date}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result = await axios(options)
        //console.log(result.data)
        res.status(200).send({ msg: result.data})//.main.temp
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getSortedCities = async function (req, res) {
    try {
       citiesList=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
       let arr=[]
        for(i=0; i< citiesList.length; i++){
        let key = req.query.appid
        let obj={city:citiesList[i]}
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${citiesList[i]}&appid=${key}`
        }
        let result = await axios(options)
        obj.temp=result.data.main.temp
        arr.push(obj)
    }
    let sortedArray=arr.sort((a,b)=>a.temp-b.temp)
    res.status(200).send({status:true, data:sortedArray})
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
    
}



let createMeme = async function (req, res) {
    try {
        let memeId = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        //console.log(`query params are: ${district} ${date}`)
        var options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${memeId}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        }
        let result = await axios(options)
        //console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}






module.exports.getDistrictsById = getDistrictsById
module.exports.getweather = getweather
module.exports.getSortedCities = getSortedCities
module.exports.createMeme=createMeme