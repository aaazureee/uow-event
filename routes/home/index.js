import express from 'express';
import moment from 'moment';
import Event from '../../models/event';
import registerRouter from './register';
import signInRouter from './sign-in';
import searchRouter from './search';
import { parseEvents } from '../common/eventParser';

const router = express.Router();

router.use('/', registerRouter);
router.use('/', signInRouter);
router.use('/', searchRouter);

router.get('/', (req, res, next) => {
  Event.find().then(result => {
    let events = parseEvents(result);
    res.render('index', {
      events,
      username: res.locals.username,
      page: 'home'
    });
    
  });
});

router.get('/sign-out', (req, res, next) => {
  if (res.locals.username) {
    req.session.destroy(err => {
      if (err) return next(err);
      return res.redirect('/');
    });
  }
});

export default router;