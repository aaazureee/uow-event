import express from 'express';
import Event from '../../models/event';
import { parseEvents } from '../common/eventParser';

const router = express.Router();

router.get('/search', (req, res) => {
  let filter_type;
  let findOptions = {
    $text: { $search: req.query.q },
  };

  switch (req.query.filter_type) {
    case 'past':
      findOptions.startDate = {$lt: new Date()};
      filter_type = 'past';
      break;
    case 'upcoming':
      findOptions.startDate = {$gt: new Date()};
      filter_type = 'upcoming';
      break;
    default:
      filter_type = 'all';
  }

  res.locals.options.filter_type = filter_type;

  Event.find(findOptions , (err, results) => {
    let events = parseEvents(results);
    res.locals.options.events = events;
    res.locals.options.searchString = req.query.q;
    res.render('search', res.locals.options);
  });
});

export default router;