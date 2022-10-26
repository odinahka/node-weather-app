const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
res.sendFile(`${__dirname}/index.html`);
})

app.post("/", (req, res) => {
const city = req.body.cityName;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc3f722c36a0030b656c96b509413a41&unit=metric`;
let data;
axios.get(url)
     .then(response => {
        console.log(response.data)
        data = response.data
       
        res.write(`<h1>The temperature of ${data.name} is ${data.main.temp}</h1>`);
        res.write(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`)
        res.send();
     })
     .catch(error => {
        console.log(error);
     });

//res.send("Running")

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})