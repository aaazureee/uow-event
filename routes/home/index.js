import express from 'express';
import Event from '../../models/event';
import registerRouter from './register';
import signInRouter from './sign-in';
import searchRouter from './search';
import bookedRouter from './booked';
import { parseEvents } from '../common/eventParser';

const router = express.Router();

router.use('/', registerRouter);
router.use('/', signInRouter);
router.use('/', searchRouter);
router.use('/', bookedRouter);

router.get('/', (req, res, next) => {
  Event.find().where('startDate').gt(new Date()).sort({startDate: 1}).then(result => {
    let events = parseEvents(result);
    res.locals.options.page = 'home';
    res.locals.options.events = events;
    res.render('index', res.locals.options);
  });
});

router.get('/sign-out', (req, res, next) => {
  if (res.locals.options.username) {
    req.session.destroy(err => {
      if (err) return next(err);
      return res.redirect('/');
    });
  }
});

export default router;