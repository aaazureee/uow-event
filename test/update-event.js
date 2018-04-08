import mongoose from 'mongoose';
import Event from '../models/event';
import assert from 'assert';

describe('Event updating test', () => {
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

  it('Update a sample event', done => {
    const event = new Event({
      eventName, summary, address, startDate, endDate, fullDesc, capacity
    });
    event.save().then(() => {
      Event.findByIdAndUpdate(
        event._id,
        {
          eventName: 'Updated name 1',
          address: 'UTS',
          endDate: new Date(2018, 11, 2),
          price: 25,
          promoCode: 'UOW50',
          discount: 0.5
        },
        { new: true }
      )
        .then(updated => {
          const { eventName, address, endDate, price, promoCode, discount } = updated;
          assert(eventName === 'Updated name 1');
          assert(address === 'UTS');
          assert(endDate.getTime() === new Date(2018, 11, 2).getTime());
          assert(price === 25);
          assert(promoCode === 'UOW50');
          assert(discount === 0.5);
          done();
        });
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('events', () => done());
  });

});
