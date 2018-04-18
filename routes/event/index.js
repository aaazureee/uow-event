import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import createRouter from './create';

router.use('/create', createRouter);
router.get('/id/:eventID', (req, res, next) => {
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.render('error_views/event-not-found',
        { eventID: req.params.eventID });
    }
    res.locals.options.event = result;
    res.render('event-page', res.locals.options);
  }).catch(() => {
    return res.render('error_views/event-not-found',
    { eventID: req.params.eventID });
  });
});

export default router;