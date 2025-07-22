//const models = require('../models/index.js')
const mongoose=require("mongoose");
const Auth = (actual_id,visitor_id) => {
  console.log("check1="+actual_id+" check2="+visitor_id)
  if(actual_id.localeCompare(visitor_id)==0)
    return true;
  throw new Error("Authentication error");
}
module.exports = {
  
  getJobs: async (parent,args,{models,user}) => {
    //console.log(visitor_id);
    //console.log("inside query"+user);
    //Auth(user.id);
    var sal=args.salaryRange.split("-"); //front end people take input as min max and concat it with -
    console.log(sal);
    var min = parseInt(sal[0],10);var max = parseInt(sal[1],10);
    console.log(min+max)
    var result = await models.Jobs.find({location:args.location,salary:{$gt:min,$lt:max}});
    console.log(result)
    return result;
  },
  getJobById: async (parent, args,{models,user}) => {
    //Auth(user.id,args.job_id);
    //console.log(await models.Note1.find({id:args.visitor_id}));
    return await models.Jobs.findOne({jid:args.id});
  },
  getUserProfile: async (parent, args,{models,user}) => {
    //Auth(user.id,args.user_id);
    console.log(args.id)
    //console.log(await models.Users.find({id:"1"}))

    return await models.Users.findOne({id:args.id});
  }
};
