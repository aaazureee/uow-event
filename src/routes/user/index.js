import express from 'express';
import moment from 'moment';

const router = express.Router();
router.get('/:username/activity', (req, res) => {
  if (res.locals.options.username !== req.params.username) {
    return res.status(401).render('error_views/auth-error', {
      error: 'You are not authorized.',
      link: '/'
    });
  }
  res.locals.options.history.forEach(elem => {
    elem.timeString = moment(elem.time).format('ddd D MMM YYYY, hh:mm:ss A');
  });
  return res.render('activity-log', res.locals.options);
});

export default router;