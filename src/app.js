import 'babel-polyfill';
require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import User from './models/user';
const MongoStore = require('connect-mongo')(session);
import compression from 'compression';
import minify from 'express-minify';
import uglifyEs from 'uglify-es';
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
import path from 'path';

// router
import homeRouter from './routes/home';
import eventRouter from './routes/event';
import userRouter from './routes/user';

const app = express();
app.use(compression());
app.use(minify({
  uglifyJsModule: uglifyEs

}));
// connect to database 
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('Connection to database established'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// redirect to https except localhost
app.use(redirectToHTTPS([/localhost:(\d{4})/]));

// construct res.locals from session to pass to other middlewares
// check authentication
app.use((req, res, next) => {
  res.locals.options = {
    username: null,
    page: null,
    type: null
  };
  User.findOne({
      username: req.session.username
    })
    .then(user => {
      if (user) {
        res.locals.options.username = user.username;
        res.locals.options.email = user.email;
        res.locals.options.type = user.userType;
        res.locals.options.history = user.history;
      }
      return next();
    });
});

// app main routers
app.use('/', homeRouter);
app.use('/event', eventRouter);
app.use('/user', userRouter);

//page not found handler
app.use((req, res) => {
  res.status(404).render('error_views/404-error');
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status = err.status || 500;
  res.send(err.message);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at port ' + listener.address().port);
});