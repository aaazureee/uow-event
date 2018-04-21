import express from 'express';
import User from '../../models/user';
import Event from '../../models/event';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let user = await User.findOne({username: res.locals.options.username});
    let event = await Event.findOne({eventId: req.body.eventId});

    if (req.body.type === 'book-in') {
      if (!event) {
        res.json({error: {type: 'eventNonExistent', message: 'Event no longer exists'}});
      } else if (event.currentBookings >= event.capacity) {
        res.json({error: {type: 'eventFull', message: 'Event fully booked'}});
      } else {
        //process booking
        event.currentBookings += 1;
        event.save();
        user.eventsBooked.push(event.eventId);
        user.save();
        res.json({success: true});
      }
    } else if (req.body.type === 'cancel') {
      event.currentBookings -= 1;
      event.save();
      user.eventsBooked = user.eventsBooked.filter( value => value !== event.eventId);
      user.save();
      res.json({success: true});
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;