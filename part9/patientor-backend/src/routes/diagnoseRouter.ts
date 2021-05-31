import diagnoseService from '../services/diagnoseService';

import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
    const result = diagnoseService.findDiagnose(req.params.code);
    res.send(result);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;