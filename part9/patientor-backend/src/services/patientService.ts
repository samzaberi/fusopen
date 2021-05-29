/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patients.json';
import { Patient } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
    const id = uuid();
    const newPatient: Patient = {
        dateOfBirth,
        gender,
        id,
        ssn,
        name,
        occupation

    };
    patients.concat(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};