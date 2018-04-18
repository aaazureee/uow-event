import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import createRouter from './create';
import { parseEvent } from '../common/eventParser';

router.use('/create', createRouter);
router.get('/id/:eventID', (req, res, next) => {
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.render('error_views/event-not-found',
        { eventID: req.params.eventID });
    }
    res.render('event-page.ejs', {
      event: parseEvent(result),
      username: res.locals.username,
      page: null
    });
  }).catch(err => {
    return res.render('error_views/event-not-found',
    { eventID: req.params.eventID });
  });
});

export default router;