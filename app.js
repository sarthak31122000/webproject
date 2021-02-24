const express = require("express");

const bodyParser = require("body-parser");

const port=process.env.PORT || 3000;
const app = express();

var items=["Buy food","cook food","eat food"];
var workItems=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/", function(req, res) {
  var today = new Date();

  var options ={
    weekday: "long",
    day: "numeric",
    month: "long"
  };

// var day="";
  var day = today.toLocaleDateString("en-US",options);
  // var currentDay=today.getDay();
  // switch (currentDay) {
  //   case 0:
  //     day = "sunday";
  //     break;
  //   case 1:
  //     day = "monday";
  //     break;
  //   case 2:
  //     day = "tuesday";
  //     break;
  //   case 3:
  //     day = "wednesday";
  //     break;
  //   case 4:
  //     day = "thursday";
  //     break;
  //   case 5:
  //     day = "friday";
  //     break;
  //   case 6:
  //     day = "saturday";
  //     break;
  //
  //   default:
  //   console.log("error : today is not yoy day");
  //
  // }

   res.render("list", {listTitle:day ,newListItems:items});
    // res.render("list", {kindOfDay:day});

});
app.post("/",function(req,res){
    var item=req.body.newitem;
    if(req.body.list === "work"){
      workItems.push(item);
      res.redirect("/work");
    }
    else{
      items.push(item);

      res.redirect("/");
    }

});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"work list",newListItems:workItems});
});
app.post("/work",function(req,res){
  let item=req.body.newitem;
  workItems.push(item);
  res.redirect("/work");
})
app.listen(port, function() {
  console.log("server running on port 3000");
});
