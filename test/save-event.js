import mongoose from 'mongoose';
import Event from '../models/event';
import Counter from '../models/counter';
import assert from 'assert';

describe('Event saving test', () => {
  const eventName = 'Sample event 1';
  const summary = 'Sample summary 1';
  const address = 'UOW';
  const startDate = new Date(2018, 3, 14);
  const endDate = new Date(2018, 4, 15);
  const fullDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat quasi atque, quae dignissimos aliquid harum porro consequuntur magnam voluptate hic laboriosam non cum. Modi consequuntur ipsam aspernatur nam temporibus maiores, sint voluptas? Doloribus, illo ex eum maxime assumenda molestias iste impedit illum, sit possimus sapiente saepe, ab fugiat aliquam.';
  const capacity = 40;

  beforeEach(done => {
    mongoose.connection.db.dropCollection('events', () => done());
  });

  it('Save an event to the database', done => {
    // sample event
    const eventDetails = {
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    };
    const event1 = new Event(eventDetails);
    const event2 = new Event(eventDetails);
    let count = 0;
    Counter.findById('entity').then(result => {
      count = result.value; // current count;
    }).then(() => {
      event1.save()
        .then(event => {
          assert(!event1.isNew);
          assert(event.eventId === count + 1);
        })
        .then(() => {
          event2.save()
            .then(event => {
              assert(!event2.isNew);
              assert(event.eventId === count + 2);
              done();
            });
        });
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('events', () => done());
  });
  
});
