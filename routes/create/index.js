import express from 'express';
import Event from '../../models/event';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('create');
});

router.post('/', (req, res, next) => {
  let data = req.body;
  Event.create({
    eventName: data.eventName,
    summary: data.summary,
    address: data.address,
    startDate: new Date(Number(data.startDate)),
    endDate: new Date(Number(data.endDate)),
    fullDesc: data.fullDesc,
    capacity: data.capacity,
    promoCode: data.promoCode,
    discount: data.discount,
  }).then((event) => {
    res.status(201).json({id: event.eventId});
  }).catch((error) => {
    console.log(error);
    res.status(500).json({message: 'Error when creating event'});
  });
});

export default router;