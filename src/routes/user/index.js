import express from 'express';
import moment from 'moment';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.use([
  '/:username', '/:username/activity', '/:username/update'
], (req, res, next) => {
  if (res.locals.options.username !== req.params.username) {
    return res.status(401).render('error_views/auth-error', {
      error: 'You are not authorized.',
      link: '/'
    });
  }
  next();
});

router.get('/:username', (req, res) => {
  res.render('profile', res.locals.options);
});

// update form
router.get('/:username/update', (req, res) => {
  res.render('update-profile', res.locals.options);
});

router.put('/:username', async (req, res, next) => {
  // different email than original
  if (res.locals.options.email !== req.body.email) {
    const count = await User.count({ email: req.body.email });
    if (count) {
      return res.json({ error: { type: 'duplicateEmail', message: 'This email has already been registered.' } });
    }
  }
  // populated password field
  if (req.body.password.trim()) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      await User.findOneAndUpdate(
        { username: res.locals.options.username },
        { email: req.body.email, password: hash }
      );
    } catch (err) {
      return next(err);
    }
  } else {
    await User.findOneAndUpdate(
      { username: res.locals.options.username },
      { email: req.body.email }
    );
  }
  return res.json({ success: true });
});

router.get('/:username/activity', (req, res) => {
  res.locals.options.history.forEach(elem => {
    elem.timeString = moment(elem.time).format('ddd D MMM YYYY, hh:mm:ss A');
  });
  return res.render('activity-log', res.locals.options);
});

export default router;