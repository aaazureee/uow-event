import express from 'express';

const router = express.Router();

router.get('/booked-events', (req, res) => {
  res.locals.options.page = 'booked-events';
  res.render('booked', res.locals.options);
});

export default router;
