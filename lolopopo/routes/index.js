var express = require('express');
var router = express.Router();
const userModel=require("./users")
const passport =require("passport")
const localStrategy =require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req,res) {
  res.render('index');
});


//for flash messages


// router.get("/failed", function(req,res){
//   req.flash("age",14);
//   req.flash("name", "Dhruv");
//   res.send("bangaya");

// });

// router.get("/checkkaro",function(req,res){
//   console.log(req.flash("age"),req.flash("name"));
//   res.send("check karlo backend ke terminal par ")
  
// })

//getting data in the mongoose 

// router.get("/create", async function(req,res){
//   let userdata =await userModel.create({
//     username:"Dhruvita",
//     nickname:"mishu ",
//     description:"i am a fashion designer ",
//     categories:['hi','fashion designer', 'life','helo'],
  
//   });
//   res.send(userdata)
// })

// router.get("/find",async function(req,res){
//   var regex= new RegExp("^dhruv$", "i")
//   let user =await userModel.find({categories:{$all:["hi"]}});
//   res.send(user);

// });

//passport 
router.get('/profile',isLoggedIn, function(req,res) {
  res.render('welcome to profile');
});


router.post("/register",function(req,res){
  var userdata= new userModel({
      
    username: req.body.username,
    secret: req.body.secret
  });

 

  userModel.register(userdata,req.body.password)
    .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect("/profile");
      })
    })
});
router.post("/login", passport.authenticate("local", {
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/");
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }res,redirect("/");

}



module.exports = router;
