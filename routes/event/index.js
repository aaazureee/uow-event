import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import createRouter from './create';
import updateRouter from './update';
import deleteRouter from './delete';
import { parseEvent } from '../common/eventParser';

router.use('/create', createRouter);
router.use('/update', updateRouter); 
router.use('/delete', deleteRouter);

router.get('/id/:eventID', (req, res) => {
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.render('error_views/event-not-found',
        { eventID: req.params.eventID });
    }
    res.locals.options.event = parseEvent(result);
    res.render('event-page', res.locals.options);
  }).catch(() => {
    return res.render('error_views/event-not-found',
    { eventID: req.params.eventID });
  });
});

export default router;