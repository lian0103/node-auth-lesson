const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://lien0103:k1319900103@cluster0.f2mhj.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// //cookie test
// app.get('/set-cookie',(req,res) =>{
//   // res.setHeader('Set-Cookie','newUser=true');
//   res.cookie('newUser',false);
//   res.cookie('isLien',true,{maxAge:1000 * 60 ,httpOnly:true})
//   res.send('browser got the cookies');
// })

// app.get('/read-cookie',(req,res)=>{
//   let cookiesFromBrowser = req.cookies;
//   console.log(cookiesFromBrowser);

//   res.json(cookiesFromBrowser);

// });

