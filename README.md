## Spiral Productivity

Copyright 2020 All Rights Reserved

Spiral combines an Agile time estimation strategy with the utility of a pomodoro timer to give you an incredibly simple all in one time managment tool. 

Live App: https://spiral-ebon.vercel.app/

![spiral](https://user-images.githubusercontent.com/8163492/98314565-177e4b00-1f8b-11eb-880f-4965583d0cca.png)


Use Spiral while doing computer work to help you stay on track, take better breaks, and avoid burnout. 

![Screen Shot 2020-11-05 at 5 20 50 PM](https://user-images.githubusercontent.com/8163492/98314634-45638f80-1f8b-11eb-98f7-2d359b5c39d1.png)

Server built with Javascript & Express, with third party libraries including Morgan, Helment, and CORS. \



## Schema

Account
{
  email: {
    type: String,
    required: true,
    unique: true
  }
   password: {
    type: String,
    required: true
  }
}

Project 
{
  project: {
   type: String,
   required: true
  }
  account: {
   type: Number,
   required: true
  }
}

Task 
{
  project: {
   type: Number,
   required: true
  }
  account: {
   type: Number,
   required: true
  }
  task:{
   type:text,
   required:true
  }
  cycle:{
   type: Number,
   required:true
}

User_Pref
{
 account:{
 type: integer,
 required: true
 } 
 gong:{
 type:boolean,
 required: true,
 } 
  _1: {type: Number}
  _2: {type: Number}
  _3: {type: Number}
  _5: {type: Number}
  _8: {type: Number}
  _13: {type: Number}
  _21: {type: Number}
  _34: {type: Number}
  _55: {type: Number}
  _89: {type: Number}
  
 }
 
 
## API OVERVIEW

├── /account
│   └── GET
│   └── POST
├── /email/:email
│   └── GET
│   └── POST
├── /account_id
│   └── GET
│   └── DELETE

├── /project
│   └── GET
│   └── POST
├── /account/:account_id
│   └── GET
├── /project_id
│   └── GET
│   └── DELETE

├── /task
│   └── GET
│   └── POST
├── /account/:account_id
│   └── GET
├── /task_id
│   └── GET
│   └── DELETE

├── /pref
│   └── GET
│   └── POST
├── /account/:account_id
│   └── GET
├── /task_id
│   └── GET
│   └── DELETE
│   └── PATCH



## POST /account

// req.body
{
  account_username: String,
  email: String,
  password: String
}

GET /account

// res.body
[
  {
    id: Number,
    account_username: String,
    email: String,
    password: String
  }
]



## POST /account/email/:email

// req.body 
{
  email: String,
  password: String
}

//res.body
{
  id: Number
}
 
 
  
## GET /account_id

//res.body
{
  id: Number
}



## POST /project

//res.body
{
 account: Number,
 project: String
}


## GET /project

//res.body
[
  {
    id: Number,
    account: Number,
    project: String
  }
]


## GET /project_id
//res.body

{
  project:String
}

## POST /task
//req.body

{
    account: Number,
    project: Number,
    task: String,
    cycle: Number
}

## GET /task/account/:account_id
//res.body
[
  {
    id: Number,
    account: Number,
    project: Number,
    task: String,
    cycle: Number
   }
]


## GET /task/:id
//res.body
  {
    id: Number,
    account: Number,
    project: Number,
    task: String,
    cycle: Number
   }
   
   
 ## POST /pref
 //req.body
 [
   {
      account: Number,
      gong: Boolean,
      _1: Number,
      _2: Number,
      _3: Number,
      _5: Number,
      _8: Number,
      _13: Number,
      _21: Number,
      _34: Number,
      _55: Number,
      _89: Number
    }
  ]
 
 
 ## GET /pref
 //res.body
 
 {
    account: Number,
    gong: Boolean,
    _1: Number,
    _2: Number,
    _3: Number,
    _5: Number,
    _8: Number,
    _13: Number,
    _21: Number,
    _34: Number,
    _55: Number,
    _89: Number
  }
 

