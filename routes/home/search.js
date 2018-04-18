import express from 'express';
import Event from '../../models/event';
import parseEvents from '../common/eventParser';

const router = express.Router();

router.get('/search', (req, res) => {
  Event.find({$text: {$search: req.query.q}}, (err, results) => {
    let events = parseEvents(results);
    
    res.render('search', {
      events,
      searchString: req.query.q,
      username: res.locals.username,
      page: null
    });
  });
});

export default router;