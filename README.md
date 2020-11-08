Spiral Productivity
Copyright 2020 All Rights Reserved

Spiral combines an Agile time estimation strategy with the utility of a pomodoro timer to give you an incredibly simple all in one time managment tool. 

Live App: https://spiral-ebon.vercel.app/

![spiral](https://user-images.githubusercontent.com/8163492/98314565-177e4b00-1f8b-11eb-880f-4965583d0cca.png)


Use Spiral while doing computer work to help you stay on track, take better breaks, and avoid burnout. 

![Screen Shot 2020-11-05 at 5 20 50 PM](https://user-images.githubusercontent.com/8163492/98314634-45638f80-1f8b-11eb-98f7-2d359b5c39d1.png)

Server built with Javascript & Express, with third party libraries including Morgan, Helment, and CORS. \

API Documentation

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





