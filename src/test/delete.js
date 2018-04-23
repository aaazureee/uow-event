import mongoose from 'mongoose';
import User from '../models/user';
import Event from '../models/event';
import assert from 'assert';

describe('Deleting test', () => {
  // sample user
  const username = 'aaazureee';
  const email = 'aaazureee@gmail.com';
  const password = '123';

  beforeEach(done => {
    const promises = [
      mongoose.connection.db.dropCollection('users'), mongoose.connection.db.dropCollection('events')
    ];
    Promise.all(promises).then(() => done())
      .catch(() => done());
  });

  it('Delete an user from database', done => {
    const user = new User({
      username, email, password
    });
    user.save().then(() => {
      User.findOneAndRemove(user._id)
        .then(removed => {
          assert(removed._id.equals(user._id));
        })
        .then(() => User.findById(user._id))
        .then(result => {
          assert(result === null);
          done();
        });
    });
  });

  it('Delete an event from database', done => {
    const eventName = 'Sample event 1';
    const summary = 'Sample summary 1';
    const address = 'UOW';
    const startDate = new Date(2018, 3, 14);
    const endDate = new Date(2018, 4, 15);
    const fullDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat quasi atque, quae dignissimos aliquid harum porro consequuntur magnam voluptate hic laboriosam non cum. Modi consequuntur ipsam aspernatur nam temporibus maiores, sint voluptas? Doloribus, illo ex eum maxime assumenda molestias iste impedit illum, sit possimus sapiente saepe, ab fugiat aliquam.';
    const capacity = 40;

    const event = new Event({
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    });
    event.save().then(() => {
      Event.findOneAndRemove(event._id)
        .then(removed => {
          assert(removed._id.equals(event._id));
        })
        .then(() => Event.findById(event._id))
        .then(result => {
          assert(result === null);
          done();
        });
    });

  });

  after(done => {
    const promises = [
      mongoose.connection.db.dropCollection('users'), mongoose.connection.db.dropCollection('events')
    ];
    Promise.all(promises).then(() => done())
      .catch(() => done());
  });
});
