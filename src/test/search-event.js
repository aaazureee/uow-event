import mongoose from 'mongoose';
import Event from '../models/event';
import Counter from '../models/counter';
import assert from 'assert';

describe('Event searching test', () => {
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

  it('Search for event, using summary keyword', done => {
    // sample event
    const event = new Event({
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    });
    const summarySearch = 'sample sum';
    const regex = new RegExp(summarySearch, 'i');
    event.save().then(() => {
      Event.find({
        $or: [
          { summary: regex },
          { fullDesc: regex }
        ]
      })
        .then(eventArray => {
          assert(eventArray[0].summary.toLowerCase().includes(summarySearch.toLowerCase()));
          done();
        });
    });
  });

  it('Search for event, using full description keyword', done => {
    // sample event
    const event = new Event({
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    });
    const fullDescSearch = 'sint vOluPt';
    const regex = new RegExp(fullDescSearch, 'i');
    event.save().then(() => {
      Event.find({
        $or: [
          { summary: regex },
          { fullDesc: regex }
        ]
      })
        .then(eventArray => {
          assert(eventArray[0].fullDesc.toLowerCase().includes(fullDescSearch.toLowerCase()));
          done();
        });
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('events', () => {
      done();
    });
  });

});
