const PORT=3000;
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
// use static css and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", (req, res)=>{
    console.log(req.body);
    res.send("hi");
})

app.listen(PORT, ()=>{
    console.log("app started at port " + PORT);
})