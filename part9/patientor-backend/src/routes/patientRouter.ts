import patientService from '../services/patientService';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (_req, res) => {
    res.send('Saving a patient!');
});

export default router;