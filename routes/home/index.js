import express from 'express';
import moment from 'moment';
import Event from '../../models/event';

const router = express.Router();
router.get('/', (req, res, next) => {
  Event.find().then(result => {
    let events = result.map(value => {
      let event = value.toObject();
      if (!event.price) {
        event.price = 'Free';
      }
      let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mmA');
      let toDate = moment(event.endDate).format('hh:mmA');
      event.durationString = `${fromDate} - ${toDate}`;
      return event;
    });

    res.render('index', { events: events });
  });
});

export default router;