import express from 'express';
import Event from '../../models/event';
import parseEvents from '../common/parseEvents';

const router = express.Router();

router.get('/search', (req, res) => {
  Event.find({ $text: { $search: req.query.q } }, (err, results) => {
    let events = parseEvents(results);
    res.locals.options.events = events;
    res.locals.options.searchString = req.query.q;
    res.render('search', res.locals.options);
  });
});

export default router;