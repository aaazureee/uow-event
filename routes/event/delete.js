import express from 'express';
import Event from '../../models/event';

const router = express.Router();

router.delete('/id/:eventID', (req, res) => {
  Event.findOneAndRemove({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.send({
        message: 'There is no event with id ' + req.params.eventID
      });
    }
    res.send({ message: 'Event with an id of ' + result.eventId + ' has been removed.' });
  }).catch(() => {
    return res.send({
      message: 'There is no event with id ' + req.params.eventID
    });
  });
});

export default router;