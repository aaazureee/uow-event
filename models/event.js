import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: {
    type: Number,
    required: true
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
  promoCode: String,
  discount: Number
});

const Event = mongoose.model('Event', eventSchema);
export default Event;