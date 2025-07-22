//const Query = require('./query');
//const Mutation = require('./mutation');
//const Subscription = require('./subscription')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub();

const {
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server-express');

require('dotenv').config();
const Auth = (actual_id,visitor_id) => {
  console.log("check1="+actual_id+" check2="+visitor_id)
  if(actual_id.localeCompare(visitor_id)==0)
    return true;
  throw new Error("Authentication error");
}

module.exports = {
  Query: 
  {
    example: ()=>{ console.log("example running"); return "wow";},
    getJobsPostedBy: async (parent,{user_id},{models,user}) => {
        result = await models.Jobs.find({postedBy:user.id});
      console.log(result)
      return result;
    },
    getJobs: async (parent,{job_search:{location,salaryRange}},{models,user}) => {
      //console.log(visitor_id);
      //console.log("inside query"+user);
      //Auth(user.id);
      console.log(location)
      var sal=salaryRange.split("-"); //front end people take input as min max and concat it with -
      console.log(sal);
      var min,max = 0;
      if(salaryRange){
        min = parseInt(sal[0],10);max = parseInt(sal[1],10);
      }
      console.log(min+max)
      var result=[];
      if(location&&salaryRange)
        result = await models.Jobs.find({location:location,salary:{$gt:min,$lt:max}});
      else if(location)
        result = await models.Jobs.find({location:location});
      else if(salaryRange)
        result = await models.Jobs.find({salary:{$gt:min,$lt:max}});
      else
        result = await models.Jobs.find();
      console.log(result)
      return result;
    },
    getApplicationsByUser: async (parent, args,{models,user}) => {
      //Auth(user.id,args.job_id);
      //console.log(await models.Note1.find({id:args.visitor_id}));
      console.log("application query")
      return await models.Applications.find({userId:args.id});
    },
    getJobById: async (parent, args,{models,user}) => {
      //Auth(user.id,args.job_id);
      //console.log(await models.Note1.find({id:args.visitor_id}));
      console.log(args.id)
      return await models.Jobs.findOne({_id:args.id});
    },
    getUserProfile: async (parent, args,{models,user}) => {
      //Auth(user.id,args.user_id);
      console.log(args.id)
      //console.log(await models.Users.find({id:"1"}))
  
      return await models.Users.findOne({_id:args.id});
    }
  },
  Mutation :
  {
    postJob: async (parent,{job_details:{title,company,description,salary,location}},{models,user}) => {
        //Auth(user.id,args.visitor_id);//authentication to be done in future
        var uid=user.id;
    
        if(user.role.localeCompare("Hiring")!=0){
          throw new ApolloError('You are not in a position to hire people','ROLE_INCOMPATIBLE');
        }
        //console.log(user+"\ninside mutation"+pubsub);
        var jid_c= await models.Jobs.countDocuments()+1;
        var newJob = await models.Jobs.create({jid:jid_c,title,company,location,salary,description,postedBy:uid});
        pubsub.publish('JOB_UPDATE', {
          fetchedUpdate:{
            upid:1,
            text: "Job Posted"
          }
        })
        return newJob.populate();
      },
      applyForJob: async (parent,args,{models,user}) => {
        //Auth(user.id,args.visitor_id);//authentication to be done in future
        var uid=user.id;
        console.log(user);
        console.log("jobid"+args.jobId)
        var jid= await models.Jobs.findOne({_id:args.jobId});
        console.log(jid);
        var already_applied = await models.Applications.findOne({jobId:jid,userId:uid});
        if(already_applied){
          throw new ApolloError('Already applied','ALREADY_APPLIED')
        }
        var aid= await models.Applications.countDocuments()+1;
        return await models.Applications.create({aId:aid,jobId:jid,userId:uid});
      },
      updateProfile: async (parent,{email,username},{models,user}) => {
        //Auth(user.id,args.visitor_id);//authentication to be done in future
        var newEmail=email.toLowerCase();
        var userToChange= await models.Users.findOne({_id:user.id});
        if(userToChange.email.localeCompare(newEmail)!=0){
          var exist = await models.Users.findOne({email:newEmail});
          if(exist){
            throw new ApolloError('User is already registered with this email','USER_ALREADY_EXISTS')
          }
          userToChange.email=newEmail;
        }
        if(userToChange.username.localeCompare(username)!=0){
          userToChange.username=username;
        }
        await userToChange.save();
        return userToChange;
      },
      signUp: async (parent, {sign_up_details:{ id,username, email, password,role}}, {models}) => {
        
        var exist = await models.Users.findOne({email:email.toLowerCase()});
        //console.log(email+exist)
        if(exist){
          
          throw new ApolloError('User is already registered with this email','USER_ALREADY_EXISTS')
        }
    
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const user = await models.Users.create({
          uid:id,
          username,
          email,
          password: hashed,
          role
        });
        const SU_token = jwt.sign({ id: user._id,role,username}, 
          process.env.JWT_SECRET,
          {
            expiresIn: "2h"
          }
        );
        user.token=SU_token;
        await user.save();
        
        //token:SU_token
        return user;
      },
      signIn: async (parent, {sign_in_details:{ username, email, password}}, {models}) => {
        if(email) {
          email = email.trim().toLowerCase();
        }
        const user = await models.Users.findOne({ email });
        console.log(user)
        if(!user){
          console.log("User not registered")
          throw new AuthenticationError('User not registered')
        }
    
        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
          console.log('Wrong password entered');
          throw new ApolloError('Wrong password','WRONG_PASSWORD');
        }
        const SI_token = jwt.sign({ id: user._id,role:user.role,username:user.username}, 
          process.env.JWT_SECRET,
          {
            expiresIn: "2h"
          }
        );
        user.token=SI_token;
        await user.save();
        console.log("Successfully logged in");
    
        return user;
      }
  },
  Subscription : {
    fetchedUpdate:  {
      subscribe: () => pubsub.asyncIterableIterator('JOB_UPDATE')
    }
  }
};
