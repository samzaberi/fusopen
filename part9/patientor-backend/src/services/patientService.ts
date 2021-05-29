import patientData from '../../data/patients.json';
import { Gender, Patient } from '../types';
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

// const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
//     const id = uuid();
//     const newPatient: Patient = {
//         dateOfBirth,
//         gender,
//         id,
//         ssn,
//         name,
//         occupation

//     };
//     patients.concat(newPatient);
//     return newPatient;
// };

const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
    const id = uuid();
    const newPatient: Patient = {
        ...patient,
        id

    };
    patients.concat(newPatient);
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatient = (object: any): Omit<Patient, 'id'> => {
    const newPatient: Omit<Patient, 'id'> = {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseStringVars(object.occupation),
        ssn: parseStringVars(object.ssn),
        name: parseStringVars(object.name)

    };

    return newPatient;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringVars = (val: unknown): string => {
    if (!val || !isString(val)) {
        throw new Error('Incorrect or missing string');
    }

    return val;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export default {
    getPatients,
    addPatient
};