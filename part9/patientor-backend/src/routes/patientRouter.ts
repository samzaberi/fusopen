import patientService, { toEntry, toPatient } from '../services/patientService';
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

router.get('/:id', (req, res) => {
    const result = patientService.findById(req.params.id);
    if (!result) {
        res.status(404).send({ error: "patient not found" });
    }
    res.send(result);
});

router.post('/:id/entries', (req, res) => {
    const entry = toEntry(req.body);
    // console.log("req entry", entry);

    const result = patientService.addEntry(req.params.id, entry);
    res.send(result);
});

export default router;