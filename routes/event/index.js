import express from 'express';
const router = express.Router();
import Event from '../../models/event';
import createRouter from './create';

router.use('/create', createRouter);
router.get('/:eventID', (req, res, next) => {
  Event.findOne({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.render('error_views/event-not-found',
        { eventID: req.params.eventID });
    }
    res.render('event-details.ejs', {
      event: result,
      username: res.locals.username
    });
  });
});

export default router;