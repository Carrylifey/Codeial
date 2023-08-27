const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy')
const { default: mongoose } = require("mongoose");
const MongoStore=require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');
const path = require('path');
const destPath = './assets/css';


app.use(sassMiddleware({
  /* Options */
  src: './assets/scss',
  dest: path.join('./assets/css'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);




//setup the  view engine
app.set("view engine", "ejs");
app.set("views", "./views");




//mongostore is used to store the session cookie in the db
app.use(session({
  name:'codeial',
  //todo to change the secrate before deployment in production mode
  secret:'something',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb://127.0.0.1:27017/codeial_devlopment',
      autoRemove: 'disabled',
  },
  function(err){
    console.log (err|| 'connect-mongodb setup ok')
  })

}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use express router
app.use("/", require("./routes"));


app.listen(port, function (err) {
  if (err) {
    console.log("Error: ", err);
    console.log(`Error in runnning the server :${err}`);
  }
  console.log(`Server is running on port:${port}`);
});
