import patientService from '../services/patientService';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient(name, dateOfBirth, ssn, gender, occupation);
    res.send(newPatient);
});


export default router;