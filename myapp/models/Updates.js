const mongoose=require("mongoose");

const UpdateSchema=new mongoose.Schema({

    upid:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    }
});

const Updates=mongoose.model('Updates',UpdateSchema);
module.exports = Updates;

