// Require the mongoose library
const mongoose = require('mongoose');

module.exports = {
  connect:()=> mongoose.connect('mongodb://localhost:27017/JobLister').then(()=>console.log("mongoose connected")).catch((e)=>console.log("failed to connect to database"))
};
