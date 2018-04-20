import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import createRouter from './create';
import updateRouter from './update';
import deleteRouter from './delete';
import { parseEvent } from '../common/eventParser';
import { isStaff } from '../common/authCheck';

router.use('/create', createRouter);
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