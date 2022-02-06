"use strict"



const express = require("express");
const bodyParser = require("body-parser");
// const router = express.Router();
const app = express()



app.listen(3000)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log('Node. js Express server is running on port 3000... ')



app.use(function (req, res, next) {
// Website you wish to allow to connect
const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io', 'http://localhost:3001'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
res.setHeader('Access-Control-Allow-Origin', origin);
}
// Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
res.setHeader('Access-Control-Allow-Methods', 'GET, POST');



// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With,content-type');
//res.setHeader('Authorization', ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNydWphbmFKYWtrdWxhIiwiaWF0IjoxNTE2MjM5MDIyfQ.gmz_t79TNhDlsJS2033Wpfay3DftCw9CO2t5whOayV4');


// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);



// Pass to next layer of middleware
next();
});



app.get('/v1/weather', get_weather)



function get_weather(request, response) {

    const header = request.headers['authorization']
    const token = header && header.split(' ')[1]

    const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNydWphbmFKYWtrdWxhIiwiaWF0IjoxNTE2MjM5MDIyfQ.gmz_t79TNhDlsJS2033Wpfay3DftCw9CO2t5whOayV4"

    if(token == null){
        response.sendStatus(401)
    }

    if(token == jwt_token){
response.json({ "coord": { "lon": -123.262, "lat": 44.5646 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n" }], "base": "stations", "main": { "temp": 58, "feels_like": 49.98, "temp_min": 48.09, "temp_max": 55.45, "pressure": 1023, "humidity": 78 }, "visibility": 10000, "wind": { "speed": 0, "deg": 0 }, "clouds": { "all": 20 }, "dt": 1641958461, "sys": { "type": 2, "id": 2040223, "country": "US", "sunrise": 1641916079, "sunset": 1641948820 }, "timezone": -28800, "id": 5720727, "name": "Corvallis", "cod": 200 })
    }
    else{
        return response.sendStatus(403)
    }
}



app.get('/v1/hello', greeting)



function greeting(request, response) {
    const header = request.headers['authorization']
    const token = header && header.split(' ')[1]

    const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNydWphbmFKYWtrdWxhIiwiaWF0IjoxNTE2MjM5MDIyfQ.gmz_t79TNhDlsJS2033Wpfay3DftCw9CO2t5whOayV4"

    if(token == null){
        response.sendStatus(401)
    }

    if(token == jwt_token){
        response.json({"greeting" : "Hi!!"})
    }
    else{
        return response.sendStatus(403)
    }

}



app.post('/v1/auth', authenticate)
function authenticate(request, response) {
console.log(request.body)
var username = request.body.username;
var password = request.body.password;



response.json({"access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNydWphbmFKYWtrdWxhIiwiaWF0IjoxNTE2MjM5MDIyfQ.gmz_t79TNhDlsJS2033Wpfay3DftCw9CO2t5whOayV4",
        "expires": "2012-04-23T18:25:43.511Z"})
}
