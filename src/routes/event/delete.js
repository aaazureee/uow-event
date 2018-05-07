import express from 'express';
import Event from '../../models/event';
import User from '../../models/user';
import { isStaff } from '../common/authCheck';

const router = express.Router();

router.delete('/id/:eventID', isStaff, (req, res) => {
  Event.findOneAndRemove({ eventId: req.params.eventID }).then(result => {
    if (!result) {
      return res.send({
        message: 'There is no event with id ' + req.params.eventID
      });
    }
    const redirect = '/manage-events';
    const page = 'Manage Events';

    User.findOneAndUpdate(
      { username: res.locals.options.username },
      {
        $push: {
          history: {
            action: `Deleted event <a href="/event/id/${result.eventId}">${result.eventName}</a>`,
            time: Date.now()
          }
        }
      }
    ).then(() => res.send({
      message: 'Event with an id of ' + result.eventId + ' has been removed.',
      redirect,
      page
    }));
  }).catch(err => {
    console.log(err);
    return res.send({
      message: 'There is no event with id ' + req.params.eventID
    });
  });
});

export default router;