import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['student', 'staff'],
  },
  eventsBooked: [Number],
  history: [
    {
      action: String,
      time: Date
    }
  ]
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        let err = new Error('Username not found.');
        err.status = 401;
        return callback(err);
      }
      // check password
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          return callback(null, user);
        }
        let err = new Error('Invalid password.');
        err.status = 401;
        return callback(err);
      });
    })
    .catch(err => {
      return callback(err);
    });

};

const User = mongoose.model('User', userSchema);
export default User;