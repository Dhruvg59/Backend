// const mongoose =require("mongoose");


//MONGOOSE DATABASE FOR THE INTERMEDIATE QUESTION AND FLASH MESSAGES I WILL MAKE IT TO 3 INDIVIDULA FILE

// mongoose.connect("mongodb://127.0.0.1:27017/testinglolopopo");
 
// const userSchema= mongoose.Schema({

//   username:String,
//   nickname:String,
//   description:String,
//   categories:{
//     type:Array,
//     default:[] 
//   },
//   datecreated:{
//     type:Date,
//     default:Date.now()
//   }
// });

// module.exports=mongoose.model("user", userSchema);



const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testinglolopopo");
const userSchema = new mongoose.Schema({
  username: String,
  secret: String,
  nickname: String,
  password:String,
  
});

userSchema.plugin(plm); // 👈 this is required!

module.exports = mongoose.model("User", userSchema);
