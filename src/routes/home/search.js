import express from 'express';
import Event from '../../models/event';
import { parseEvents } from '../common/eventParser';

const router = express.Router();

router.get('/search', async (req, res) => {
  let filter_type;

  switch (req.query.filter_type) {
    case 'past':
      findOptions.startDate = { $lt: new Date() };
      filter_type = 'past';
      break;
    case 'upcoming':
      findOptions.startDate = { $gt: new Date() };
      filter_type = 'upcoming';
      break;
    default:
      filter_type = 'all';
  }

  res.locals.options.filter_type = filter_type;

  let findOptions = {
    $text: { $search: req.query.q }
  };
  const regex = new RegExp(req.query.q, 'i');
  const [partialSearch, fullSearch] = await Promise.all([
    Event.find({
      $or: [
        { eventName: regex },
        { summary: regex }
      ]
    }),
    Event.find(findOptions)
  ]);
  const duplicates = [...partialSearch, ...fullSearch];
  const duplicateIds = duplicates.map(result => result._id.toString());
  let results = duplicateIds.filter((id, pos) =>
    duplicateIds.indexOf(id) === pos
  ); // de-duplicate ids
  results = results.map(id =>
    duplicates.find(result => result._id.toString() === id)
  ); // map id to event objects

  let events = parseEvents(results);
  res.locals.options.events = events;
  res.locals.options.searchString = req.query.q;
  res.render('search', res.locals.options);
});

export default router;