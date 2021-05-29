import patientService, { toPatient } from '../services/patientService';
import express from 'express';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    const patient = toPatient(req.body);
    const newPatient = patientService.addPatient(patient);
    res.send(newPatient);
});


export default router;