import mongoose from 'mongoose';
import Event from '../models/event';
import assert from 'assert';

describe('Save event to database', () => {
  const eventName = 'Sample event 1';
  const summary = 'Sample summary 1';
  const address = 'UOW';
  const startDate = new Date(2018, 3, 14);
  const endDate = new Date(2018, 4, 15);
  const fullDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat quasi atque, quae dignissimos aliquid harum porro consequuntur magnam voluptate hic laboriosam non cum. Modi consequuntur ipsam aspernatur nam temporibus maiores, sint voluptas? Doloribus, illo ex eum maxime assumenda molestias iste impedit illum, sit possimus sapiente saepe, ab fugiat aliquam.';
  const capacity = 40;

  beforeEach(done => {
    mongoose.connection.db.dropCollection('events', () => {
      done();
    });
  });

  it('Save an event to the database', done => {
    const event1 = {
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    };
    const event2 = Object.assign({}, event1);
    Event.create(event1)
      .then(result => {
        assert(!event1.isNew);
        
      })
      .then(() => {
        Event.create(event2).then(result => {
          assert(!event2.isNew);
          done();
        });
      });
  });
});
