//const models = require('../models/index.js')
const mongoose=require("mongoose");

module.exports = {
  fetchedUpdate:  {
    subscribe: (_,__,{models,user,pubsub}) => pubsub.asyncIterableIterator('JOB_UPDATE')
  }
};
