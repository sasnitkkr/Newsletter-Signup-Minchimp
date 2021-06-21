const PORT=3000;
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
// use static css and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", (req, res)=>{
    // console.log(req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailId = req.body.emailId;

    let data = {
        members: [
            {
                email_address: emailId,
                status: "subscribed",
                merge_fields: {
                    // https://us6.admin.mailchimp.com/lists/settings/merge-tags?id=677493
                    FNAME : firstName,
                    LNAME : lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/af0467c9a4";

    const options = {
        method: "POST",
        auth: "sahil:e0efa9bb853ccb46bbf4f946beb9205c-us6"
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode ===  200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end(); 
})

app.post("/failure", (req, res)=>{
    // console.log("sahil")
    res.redirect("/"); 
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log("app started at port " + PORT);
})

//mailchimp.com/developer

// API Key
// e0efa9bb853ccb46bbf4f946beb9205c-us6

// List/Audience Id : audience/manage audience/settings
// af0467c9a4

// https://mailchimp.com/developer/marketing/api/abuse-reports/