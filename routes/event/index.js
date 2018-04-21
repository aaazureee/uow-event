import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import User from '../../models/user';
import createRouter from './create';
<<<<<<< HEAD
import bookRouter from './book';
=======
import updateRouter from './update';
import deleteRouter from './delete';
>>>>>>> master
import { parseEvent } from '../common/eventParser';
import { isStaff } from '../common/authCheck';

router.use('/create', createRouter);
<<<<<<< HEAD
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
=======
router.use('/update', updateRouter);
router.use('/delete', deleteRouter);

// view middleware
router.get(['/id/:eventID', '/id/:eventID/checkout', '/id/:eventID/promo'], (req, res, next) => {
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.status(404).render('error_views/event-not-found', {
        error: 'There is no event with id: ' + req.params.eventID,
        link: '/'
      });
    }
    res.locals.options.event = parseEvent(result);
    return next();
  }).catch(() => {
    return res.status(404).render('error_views/event-not-found', {
      error: 'There is no event with id: ' + req.params.eventID,
      link: '/'
    });
  });
>>>>>>> master
});

router.get('/id/:eventID', (req, res) => {
  res.render('event-page', res.locals.options);
});

router.get('/id/:eventID/promo', isStaff, (req, res) => {
  res.send({ promoCode: res.locals.options.event.promoCode });
});

router.get('/id/:eventID/checkout', (req, res) => {
  if (res.locals.options.event.price !== 'Free') {
    return res.render('checkout', res.locals.options);
  }
  return res.redirect('/event/id/' + req.params.eventID);
});

export default router;