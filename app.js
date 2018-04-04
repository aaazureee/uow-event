import express from 'express';
import mongoose from 'mongoose';

import homeRouter from './routes/home';

const app = express();

app.use('/', homeRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at ' + listener.address().port);
})