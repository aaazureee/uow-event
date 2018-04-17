import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.get('/sign-in', (req, res) => {
  res.render('sign-in', {
    username: res.locals.username,
    page: 'sign-in'
  });
});

router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  User.authenticate(username, password, function (err, user) {
    if (err) {
      return res.status(err.status).render('error_views/auth-error',
        { error: err.message, link: '/sign-in' });
    }
    req.session.username = user.username;
    return res.redirect('/');
  });
});

export default router;