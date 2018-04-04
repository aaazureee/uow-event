import express from 'express';

const router = express.Router();
router.get('/', (req, res, next) => {
    res.send('This is home');
});

router.get('/test', (req, res, next) => {
    res.send('Testing');
});


export default router;