import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import User from '../../models/user';
import createRouter from './create';
import bookRouter from './book';
import { parseEvent } from '../common/eventParser';

router.use('/create', createRouter);
router.use('/book', bookRouter);
router.get('/id/:eventID', async (req, res, next) => {
  try {
    let event = await Event.findOne({ eventId: req.params.eventID });

    if (!event) {
      throw new Error('event not found');
    }

    if (event.currentBookings >= event.capacity) {
      res.locals.options.eventFull = true;
    } else {
      res.locals.options.eventFull = false;
    }

    //TODO: what happen if no user is logged in
    let user = await User.findOne({username: res.locals.options.username});
    if (user.eventsBooked.includes(event.eventId)) {
      res.locals.options.booked = true;
    } else {
      res.locals.options.booked = false;
    }

    res.locals.options.event = parseEvent(event);
    res.render('event-page', res.locals.options);

  } catch (err) {
    console.log(err);
    return res.render('error_views/event-not-found',
    { eventID: req.params.eventID });
  }
});

export default router;