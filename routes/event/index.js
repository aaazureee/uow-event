import express from 'express'; 
const router = express.Router();
import Event from '../../models/event';

router.get('/:eventID', (req, res, next) => {
    Event.findOne({eventId: req.params.eventID}).then((result)=>{
        res.render('event-details.ejs', {event: result});
    });
});

export default router;