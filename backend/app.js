const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express = require('express');
const app = express()

dotenv.config({ path: './config.env'});
require('./db/conn');
// const User= require('./model/userschema');

app.use(express.json());
//we link the router file to make  our route easy
app.use(require('./router/auth'));

const PORT= process.env.PORT;
 


//middleware

const middleware =(req, res, next) =>{
  console.log(`this is my middleware`);
  next();
}


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})