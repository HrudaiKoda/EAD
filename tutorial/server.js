//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

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

app.use(session({
    secret:"Ourlitllesecret",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/newdb",{ useNewUrlParser: true });

mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  entered_by: String,
  img:
  {
      data: Buffer,
      contentType: String,
      path: String
  }
});

const Post = mongoose.model("Post", postSchema);




app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/login",function(req,res){
    const user = new User({
        username:req.body.username,
        password: req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local");
            res.redirect("/");
        }
    })
});

app.post("/register",function(req,res){
    User.register({username:req.body.username},req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
          }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            })
        }
    })
});



app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})


app.get("/",function(req,res){
    if(req.isAuthenticated()){
    
    Post.find({},function(err,file){
        if(err){
            console.log(err);
        }
        else{
        var posts = file;
        res.render("home" ,{posts:posts});
    }
    });
    }
    else{
        res.redirect("/login");
    }
    
});


app.get("/compose",function(req,res){
    if(req.isAuthenticated()){
    var a = req.user._id;
    res.render("compose",{user:a});
    }
    else{
        res.redirect("/login");
    }
})

app.post("/compose",upload.single('image'),function(req,res){
const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    entered_by: req.body.user,
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

app.get("/view/:id",function(req,res){
    
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
    console.log("Server started on port 4000");
  });

