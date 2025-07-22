const Jobs = require('./Jobs');
const Users = require('./Users');
const Applications = require('./Applications')
const Updates = require('./Updates')
const jwt = require('jsonwebtoken');

const models = {
    Jobs,
    Users,
    Applications,
    Updates
}

const getUser = token => {
    if(token) {
        try {
            return jwt.verify(token,process.env.JWT_SECRET);
        } catch(err) {
            console.log("Invalid token")
            throw new Error("Session invalid");
        }
    }
}
module.exports = {models,getUser};
