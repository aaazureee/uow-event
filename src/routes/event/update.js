import express from 'express';
import Event from '../../models/event';
import User from '../../models/user';
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

router.put('/id/:eventID/', isStaff, async (req, res) => {
  let { eventName, summary, address, startDate, endDate, fullDesc, capacity, promoCode, discount, price } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  let event = await Event.findOne({ eventId: req.params.eventID });

  if (capacity < event.currentBookings) {
    return res.json({ error: 'Updated event\'s capacity must be higher than current bookings.' });
  }

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
    User.findOneAndUpdate(
      { username: res.locals.options.username },
      {
        $push: {
          history: {
            action: `Updated event <a href="/event/id/${event.eventId}">${event.eventName}</a>`,
            time: Date.now()
          }
        }
      }
    ).then(() => res.status(201).json({ id: event.eventId }));
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error when updating event' });
  });
});

export default router;