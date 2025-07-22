const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({

    uid:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
            enum : ['Seeking','Hiring'],
        required:true,
    },
    token:{
        type:String
    }
});

const Users=mongoose.model('Site_Users',UserSchema);
module.exports = Users;

