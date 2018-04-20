import express from 'express';
import Event from '../../models/event';
import { parseEvent } from '../common/eventParser';
import { isStaff } from '../common/authCheck';
const router = express.Router();

router.get('/id/:eventID/', isStaff, (req, res) => {
  res.locals.options.page = 'manage-events';
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.status(404).render('error_views/event-not-found', {
        error: 'There is no event with id: ' + req.params.eventID,
        link: '/'
      });
    }
    res.locals.options.event = parseEvent(result);
    res.render('update-event', res.locals.options);
  }).catch(() => {
    return res.status(404).render('error_views/event-not-found', {
      error: 'There is no event with id: ' + req.params.eventID,
      link: '/'
    });
  });
});

router.post('/id/:eventID/', isStaff, (req, res) => {
  let { eventName, summary, address, startDate, endDate, fullDesc, capacity, promoCode, discount, price } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  Event.findOneAndUpdate({ eventId: req.params.eventID }, {
    eventName,
    summary,
    address,
    startDate,
    endDate,
    fullDesc,
    capacity,
    promoCode,
    discount,
    price,
  }).then(event => {
    res.status(201).json({ id: event.eventId });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error when creating event' });
  });
});

export default router;