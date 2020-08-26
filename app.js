const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);


  const data = {
    members :[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName

        }
      }
    ]
  };
  const jasonData = JSON.stringify(data);
  const url ="https:us17.api.mailchimp.com/3.0/lists/d3f513e96e"
  const options = {
    method: "POST",
    auth: "amir20:f016dd16891e7a7f190048825c997783-us17"
  }
  const request = https.request(url, options, function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    } else {res.sendFile(__dirname+"/failure.html");}
    // response.on("data",function(data){
    //   console.log(JSON.parse(data));
    // })

  })

  request.write(jasonData);
  request.end();

});



app.post("/failure", function(req,res){
  res.redirect("/");
});









app.listen(process.env.PORT, function(){
  console.log("Server is running on port 3003.");
});

// API key
// f016dd16891e7a7f190048825c997783-us17


// list
// d3f513e96e
