import express from 'express';
import Event from '../../models/event';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('create');
});

router.post('/', (req, res, next) => {
  const {eventName, summary, address, fullDesc, capacity, promoCode, discount, price} = req.body;

  Event.create({
    eventName,
    summary,
    address,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    fullDesc,
    capacity,
    promoCode,
    discount,
    price,
  }).then((event) => {
    res.status(201).json({id: event.eventId});
  }).catch((error) => {
    console.log(error);
    res.status(500).json({message: 'Error when creating event'});
  });
});

export default router;