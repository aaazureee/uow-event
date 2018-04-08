import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const dbuser = 'test';
const dbpassword = 'test';
before(done => {
  mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds233769.mlab.com:33769/dev-event`);
  mongoose.connection
    .once('open', () => {
      console.log('Connected to mongoDB...');
      done();
    })
    .on('error', err => console.log(err));
});
