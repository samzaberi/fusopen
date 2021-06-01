import patientData from '../../data/patients.json';
import { Entry, Gender, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

let patients: Array<Patient> = patientData;

const getPublicPatients = (): PublicPatient[] => {
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

const getPatients = (): Patient[] => {
    return patients;
};

const addPatient = (patient: Omit<Patient, 'id' | 'entries'>): Patient => {
    const id = uuid();
    const newPatient: Patient = {
        ...patient,
        id,
        entries: []

    };
    patients.concat(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

const addEntry = (id: string, entryDetails: Omit<Entry, 'id'>): Patient => {
    const patient = patients.find(d => d.id === id);
    if (!patient) {
        throw new Error("invalid id");
    }
    // console.log("patient entries", patient.entries);
    const newEntry = {
        ...entryDetails,
        id: uuid()
    };
    const patientEntries = patient.entries ? [...patient.entries, newEntry] : [newEntry];
    // console.log(patientEntries);
    const newPatient = {
        ...patient,
        entries: patientEntries
    };
    // console.log(newPatient);
    patients = patients.filter(p => p.id === id ? newPatient : p);
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatient = (object: any): Omit<Patient, 'id' | 'entries'> => {
    const newPatient: Omit<Patient, 'id' | 'entries'> = {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseStringVars(object.occupation),
        ssn: parseStringVars(object.ssn),
        name: parseStringVars(object.name)

    };

    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toEntry = (object: any): Omit<Entry, 'id'> => {
    const newEntry: Omit<Entry, 'id'> = {
        date: parseDate(object.date),
        specialist: parseStringVars(object.specialist),
        description: parseStringVars(object.description),
        diagnoseCodes: parseStrArr(object.diagnoseCodes),
        type: parseStringVars(object.type) === "hospital" ? "hospital" : "occupational",
        discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseStringVars(object.discharge.criteria)
        }


    };

    return newEntry;
};

const parseStrArr = (val: unknown[]): string[] => {
    const result = val.map(element => parseStringVars(element));
    return result;
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
    addPatient,
    getPublicPatients,
    findById,
    addEntry
};