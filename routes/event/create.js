import express from 'express';
import Event from '../../models/event';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('create', {
    username: res.locals.username,
    page: 'create'
  });
});

router.post('/', (req, res, next) => {
  let { eventName, summary, address, startDate, endDate, fullDesc, capacity, promoCode, discount, price } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  Event.create({
    eventName,
    summary,
    address,
    startDate,
    endDate,
    fullDesc,
    capacity,
    promoCode,
    discount,
    price,
  }).then(event => {
    res.status(201).json({ id: event.eventId });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error when creating event' });
  });
});

export default router;