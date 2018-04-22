import express from 'express';
import Event from '../../models/event';
import { parseEvents } from '../common/eventParser';
import { isStaff } from '../common/authCheck';

const router = express.Router();

router.get('/manage-events', isStaff, async (req, res) => {
  let events, filter_type;
  switch (req.query.filter_type) {
    case 'past':
      events = await Event.find({})
        .where('startDate').lt(new Date())
        .sort('startDate');
      filter_type = 'past';
      break;
    case 'upcoming':
      events = await Event.find({})
        .where('startDate').gt(new Date())
        .sort('startDate');
      filter_type = 'upcoming';
      break;
    default:
      events = await Event.find({}).sort('startDate');
      filter_type = 'all';
  }
  res.locals.options.events = parseEvents(events);
  res.locals.options.page = 'manage-events';
  res.locals.options.filter_type = filter_type;
  res.render('manage', res.locals.options);
});

export default router;