import express from 'express';
import { isSignedIn } from '../common/authCheck';
const router = express.Router();

router.get('/booked-events', isSignedIn, (req, res) => {
  res.locals.options.page = 'booked-events';
  res.render('booked', res.locals.options);
});

export default router;
