//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })

 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/newdb",{ useNewUrlParser: true });


const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  img:
  {
      data: Buffer,
      contentType: String,
      path: String
  }
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });

const Post = mongoose.model("Post", postSchema);
const user = mongoose.model("user", userSchema);

app.get("/register",function(req,res){
    res.render("register");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/register",function(req,res){
    var ma = req.body.Email;
    var pas = req.body.password;
    console.log(ma);
    console.log(pas);
    const user_1 = new user({
        email: ma,
        password: pas
      });
    
    
      user_1.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });

});



app.get("/",function(req,res){
    
    Post.find({},function(err,file){
        if(err){
            console.log(err);
        }
        else{
        var posts = file;
        res.render("home" ,{posts:posts});
    }
    });
    
});


app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",upload.single('image'),function(req,res){
const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png' ,
        path: path.join(__dirname + '/uploads/' + req.file.filename)
    }
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
})

app.get("/:id",function(req,res){
    
    const post_id = req.params.id;
    Post.findOne({_id:post_id},function(err,pos){
        var a = {this_post:pos};
        res.render("view",a);
    })
})

app.get("/edit/:edit_id",function(req,res){
    const id = req.params.edit_id;
    Post.findOne({_id:id},function(err,post){
        res.render("edit",{edit_post:post});
    })
})

app.post("/editpost/:po_id",function(req,res){
    const id_1 = req.params.po_id
    var ti =  req.body.postTitle;
    var con = req.body.postBody;
    //console.log(ti)
    //console.log(con)
    Post.findByIdAndUpdate(id_1,{title:ti , content:con},function(err,fin){
        if(err){
            res.send(err);
        }
        else{
            console.log(fin);
            res.redirect("/");
        }
    })
})
app.listen(4000, function() {
    console.log("Server started on port 3000");
  });