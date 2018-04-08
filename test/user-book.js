import mongoose from 'mongoose';
import Event from '../models/event';
import User from '../models/user';
import assert from 'assert';

describe('User booking test', () => {
  // sample event
  const eventName = 'Sample event 1';
  const summary = 'Sample summary 1';
  const address = 'UOW';
  const startDate = new Date(2018, 3, 14);
  const endDate = new Date(2018, 4, 15);
  const fullDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat quasi atque, quae dignissimos aliquid harum porro consequuntur magnam voluptate hic laboriosam non cum. Modi consequuntur ipsam aspernatur nam temporibus maiores, sint voluptas? Doloribus, illo ex eum maxime assumenda molestias iste impedit illum, sit possimus sapiente saepe, ab fugiat aliquam.';
  const capacity = 40;

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

  it('An user make an event booking', done => {
    // sample event
    const event = new Event({
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    });
    const user = new User({
      username, email, password
    });
    let eventId;
    event.save().then(() => {
      user.save()
        .then(() => {
          assert(!user.isNew);
          // inc current bookings
          return Event.findByIdAndUpdate(
            event._id, { $inc: { currentBookings: 1 }, }, { new: true }
          );
        })
        .then(event => {
          eventId = event.eventId;
          assert(event.currentBookings === 1);
          // push eventId to user bookings
          return User.findByIdAndUpdate(
            user._id, { $push: { eventsBooked: event.eventId } }, { new: true }
          );
        })
        .then(user => {
          assert(user.eventsBooked.length === 1);
          assert(user.eventsBooked.indexOf(eventId) !== -1);
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
