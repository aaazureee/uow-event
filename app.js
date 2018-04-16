import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import User from './models/user';
const MongoStore = require('connect-mongo')(session);

// router
import homeRouter from './routes/home';
import eventRouter from './routes/event';

const app = express();
// connect to database
const dbuser = 'test';
const dbpassword = 'test';
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds115569.mlab.com:15569/event`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('Connection to database established'));

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'tuturu',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


// construct res.locals from session to pass to other middlewares
// check authentication
app.use((req, res, next) => {
  res.locals.username = null;
  User.findOne({ username: req.session.username })
    .then(user => {
      if (user) {
        req.session.username = user.username;
        res.locals.username = user.username;
      }
      return next();
    });
});

app.use('/', homeRouter);
app.use('/event', eventRouter);
app.get('/ev', (req, res) => {
  res.render('event-page', {
    page: null,
    username: null
  });
});

//page not found handler
app.use((req, res, next) => {
  res.status(404).render('error_views/error');
});

//error handler
app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.send(err.message);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at ' + listener.address().port);
});