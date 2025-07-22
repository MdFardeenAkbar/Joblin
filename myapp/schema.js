const { gql } = require('apollo-server-express');

module.exports =  gql`
  type Update {
    upid: ID!
    text: String!
  }
  type Job {
    id: ID!
    title: String!
    company: String!
    location: String!
    salary: Float
    description: String!
    postedBy: User!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    role: String! # Job Seeker or Employer
    token: String!
  }
  type Application {
    id: ID!
    jobId: ID!
    userId: ID!
    status: String! # Applied, Interviewing, Hired
  }
  type Query {
    example:String!
    getJobs(job_search:JobSearch): [Job]
    getJobsPostedBy(user_id:ID!): [Job]
    getJobById(id: ID!): Job
    getUserProfile(id: ID!): User
    getApplicationsByUser(id:ID!):[Application]
  }
  type Mutation {
    postJob(job_details:JobDetails): Job
    applyForJob(jobId: ID!): Application
    updateProfile(username: String, email: String): User
    signUp(sign_up_details:SignUpDetails): User
    signIn(sign_in_details:SignInDetails): User
  }
  type Subscription {
    fetchedUpdate:Update
  }
  input JobSearch{
    location:String!
    salaryRange:String!
  }
  input SignUpDetails {
    id:ID!
    username:String!
    email:String!
    password:String!
    role:String!
  }
  input SignInDetails {
    email:String!
    password:String!
  }  
  input JobDetails {
    title: String!
    company: String!
    description: String!
    salary:Float!
    location: String!
  }
`;
