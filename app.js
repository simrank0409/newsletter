const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");
const app = express();

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "18e4835da5c6578ea2ee1fbdc2c98065-us10",
    server: "us10",
  });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.LName;
  const email = req.body.email;
  const listId= "cbc21cad25";

  async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
            // res.sendFile(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
            res.sendFile(__dirname + "/success.html");
        } catch (e){
            // console.log(e.status);
            // res.sendFile("failled");
            res.sendFile(__dirname + "/failure.html");
        };

    };
    run();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});

// mailchimp apikey
// 18e4835da5c6578ea2ee1fbdc2c98065-us10

// list id cbc21cad25
