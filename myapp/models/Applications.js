const mongoose=require("mongoose");

const ApplicationSchema=new mongoose.Schema({

    aId:{
        type:Number,
        required:true
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
         enum : ['Applied','Interviewing','Hired'],
        required:true,
        default:"Applied"
    },
   
});

const Applications=mongoose.model("Applications",ApplicationSchema);
module.exports=Applications;