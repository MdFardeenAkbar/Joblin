const mongoose = require("mongoose");

//create schema
const JobSchema=new mongoose.Schema({

    jid:{
        type:String,
        required:true,
        unique: true
    },
    title:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
       required:true,
    },
   
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});

//create model
const Jobs=mongoose.model("Jobs",JobSchema);
//export model
module.exports=Jobs;
