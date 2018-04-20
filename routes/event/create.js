import express from 'express';
import Event from '../../models/event';
import { isStaff } from '../common/authCheck';

const router = express.Router();

router.get('/', isStaff, (req, res) => {
  res.locals.options.page = 'create';
  res.render('create', res.locals.options);
});

router.post('/', isStaff, (req, res, next) => {
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