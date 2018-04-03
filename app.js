import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.get('/', (req, res) => res.send('123'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at ' + listener.address().port);
})