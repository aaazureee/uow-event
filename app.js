import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import homeRouter from './routes/home';
import eventRouter from './routes/event';
import createRouter from './routes/create';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbuser = 'test';
const dbpassword = 'test';
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds115569.mlab.com:15569/event`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('Connection to database established'));

app.use('/', homeRouter);
app.use('/event', eventRouter);
app.use('/create', createRouter);

//page not found handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

//error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error-500');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at ' + listener.address().port);
});