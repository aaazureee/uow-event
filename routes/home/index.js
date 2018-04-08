import express from 'express';
const router = express.Router();
import moment from 'moment';

import Event from '../../models/event';

router.get('/', (req, res, next) => {
    Event.find().then((result)=>{
        for (let event of result) {
            if (!event.price) {
                event.price = "Free";
            }
            let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mmA');
            let toDate = moment(event.endDate).format('hh:mmA');
            event.durationString = `${fromDate} - ${toDate}`;

        }
        res.render('index', {events: result});
    });
});

router.get('/test', (req, res, next) => {
    res.send('Testing');
});


export default router;