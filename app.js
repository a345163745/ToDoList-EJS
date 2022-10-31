const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+ "/data.js");
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

const items = [];
const workItems = [];

app.get('/',(req,res)=>{
    const day = date.getDate();
    res.render("list",{listTitle:day,newItems:items});
})

app.post('/',(req,res)=>{
    const item = req.body.newItem;
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/Work");
    }else{
    items.push(item);
    console.log(req.body);
    res.redirect("/");
    }
})

app.get('/Work',(req,res)=>{
    res.render('list',{listTitle:"Work List",newItems:workItems});
})

app.listen(3000,()=>{
    console.log("running on port 3000...")
})