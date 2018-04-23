import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: String,
  value: Number
});

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;