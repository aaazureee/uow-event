import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.get('/sign-in', (req, res) => {
  res.locals.options.page = 'sign-in';
  res.render('sign-in', res.locals.options);
});

router.post('/sign-in', (req, res) => {
  const { username, password } = req.body;
  User.authenticate(username, password, function (err, user) {
    if (err) {
      return res.status(err.status).render('error_views/auth-error',
        { error: err.message, link: '/sign-in' });
    }
    req.session.username = user.username;
    if (req.body.remember_me) {
      req.session.cookie.maxAge = 14 * 24 * 3600 * 1000; // 2 wks
    } else {
      req.session.cookie.maxAge = 24 * 3600 * 1000; // 1 day
    }
    return res.redirect('/');
  });
});

export default router;