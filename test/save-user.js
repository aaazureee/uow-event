import mongoose from 'mongoose';
import User from '../models/user';
import assert from 'assert';

describe('User saving test', () => {
  // sample user
  const username = 'aaazureee';
  const email = 'aaazureee@gmail.com';
  const password = '123';
  const eventsBooked = [1000];

  beforeEach(done => {
    mongoose.connection.db.dropCollection('users', () => done());
  });

  it('Save an user with all accepted attributes', done => {
    const user = new User({
      username, email, password, eventsBooked
    });
    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });

  it('Save an user with missing email is not allowed', done => {
    const missingEmailUser = new User({
      username, password, eventsBooked
    });
    missingEmailUser.save().catch(err => {
      assert(err.message);
      done();
    });
  });

  it('Save 2 user with duplicate values (concurrent) is not allowed', done => {
    const user1 = { username, email, password, eventsBooked };
    const user2 = Object.assign({}, user1);
    user2.email = 'kappa123@gmail.com';

    User.ensureIndexes(err => {
      assert.ifError(err);
      User.create([user1, user2])
        .catch(error => {
          assert(error);
          assert(!error.errors);
          assert(error.message.indexOf('duplicate key error') !== -1);
          done();
        });
    });
  });

  it('Save 2 user with duplicate values (sequential) is not allowed', done => {
    const user1 = { username, email, password, eventsBooked };
    const user2 = { username, email, password, eventsBooked };
    user2.email = 'kappa123@gmail.com';

    User.ensureIndexes(() => {
      User.create(user1)
        .then(() => User.create(user2))
        .then(() => done())
        .catch(error => {
          assert(error);
          assert(!error.errors);
          assert(error.message.indexOf('duplicate key error') !== -1);
          User.count({}).then(count => {
            assert(count === 1);
            done();
          });
        });
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('users', () => done());
  });
});
