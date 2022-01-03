//jshint esversion:6
const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');
const app=express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/hello.html");

app.post("/",function(req,res){

const city=req.body.cityname;
const appid="ef5b49959cfc4185168a1c3f4c17dfae";
const unit="metric";

https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units="+ unit,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    const temp=weatherdata.main.temp
    const weatherdiscription=weatherdata.weather[0].description
    const icon=weatherdata.weather[0].icon

    const imgurl="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    res.write("<p> The weather is currently "+ weatherdiscription +"</p>");
    res.write("<h1> The temperature in "+ city + " is "+ temp +" degree celcius</h1>");
    res.write("<img src="+ imgurl + ">");
    res.send();
  });
});
});
});
app.listen(3000,function(){
  console.log("Success run at port 3000");
});
