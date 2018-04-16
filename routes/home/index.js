import express from 'express';
import moment from 'moment';
import Event from '../../models/event';
import registerRouter from './register';
import signInRouter from './sign-in';

const router = express.Router();

router.use('/', registerRouter);
router.use('/', signInRouter);

router.get('/', (req, res, next) => {
  Event.find().then(result => {
    let events = result.map(value => {
      let event = value.toObject();
      if (!event.price) {
        event.price = 'Free';
      } else {
        event.price = '$' + event.price;
      }
      let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mmA');
      let toDate = moment(event.endDate).format('hh:mmA');
      event.durationString = `${fromDate} to ${toDate}`;
      return event;
    });

    res.render('index', {
      title: 'Event Booking System',
      events,
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