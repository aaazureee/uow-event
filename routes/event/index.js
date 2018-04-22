import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import User from '../../models/user';
import createRouter from './create';
import bookRouter from './book';
import updateRouter from './update';
import deleteRouter from './delete';
import { parseEvent } from '../common/eventParser';
import { isSignedIn } from '../common/authCheck';

router.use('/create', createRouter);
router.use('/book', bookRouter);
router.use('/update', updateRouter);
router.use('/delete', deleteRouter);

// view middleware
router.get(['/id/:eventID', '/id/:eventID/checkout'], (req, res, next) => {
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
});

router.get('/id/:eventID', async (req, res, next) => {
  try {
    let event = res.locals.options.event;

    res.locals.options.eventFull = false;
    res.locals.options.booked = false;
    
    let user = await User.findOne({username: res.locals.options.username});
    //when user is logged in
    if (user) {
      if (user.eventsBooked.includes(event.eventId)) {
        res.locals.options.booked = true;
      } 
    } 

    if (event.currentBookings >= event.capacity) {
      res.locals.options.eventFull = true;
    } 

    res.render('event-page', res.locals.options);

  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/id/:eventID/checkout', isSignedIn, (req, res) => {
  if (res.locals.options.event.price !== 'Free') {
    return res.render('checkout', res.locals.options);
  }
  return res.redirect('/event/id/' + req.params.eventID);
});

router.post('/id/:eventId/promo', isSignedIn, async (req, res, next) => {
  try {
    let event = await Event.findOne({ eventId: req.params.eventId });
    if (req.body.promo === event.promoCode) {
      res.json({valid: true, discount: event.discount});
    } else {
      res.json({valid: false});
    }
  } catch (err) {
    next(err);
  }
});
export default router;