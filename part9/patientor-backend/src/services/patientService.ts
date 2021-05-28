import patientData from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            dateOfBirth,
            gender,
            id,
            name,
            occupation
        };
    });
};

export default {
    getPatients
};