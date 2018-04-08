import express from 'express';
import mongoose from 'mongoose';

import homeRouter from './routes/home';
import eventRouter from './routes/event';

const app = express();
app.set('view engine', 'ejs');

const dbuser = 'test';
const dbpassword = 'test';
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds233769.mlab.com:33769/dev-event`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('Connection to database established'));



app.use('/', homeRouter);
app.use('/event', eventRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at ' + listener.address().port);
});