import mongoose from 'mongoose';
import Counter from './counter';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: {
    type: Number
  },
  eventName: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  fullDesc: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentBookings: {
    type: Number,
    default: 0
  },
  promoCode: String,
  discount: Number,
  price: Number
});

eventSchema.index({eventName: 'text', summary: 'text'});

eventSchema.pre('save', function (next) {
  var event = this;
  if (!event.isNew) {
    next();
  }
  Counter.count({}).then(count => {
    if (count === 0) {
      Counter.create({
        _id: 'entity',
        value: 1000
      }).then(result => {
        event.eventId = result.value;
        next();
      });
    } else {
      Counter.findOneAndUpdate(
        { _id: 'entity' },
        { $inc: { value: 1 } },
        { new: true }).then(result => {
          event.eventId = result.value;
          next();
        });
    }
  });
});

const Event = mongoose.model('Event', eventSchema);
export default Event;