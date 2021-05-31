export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    male = 'male',
    female = 'female'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface CoreEntry {
    id: string,
    date: string,
    specialist: string,
    diagnoseCodes: string[],
    description: string,
    discharge: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthCareEntry extends CoreEntry {
    type: "occupational"
}

interface HospitalEntry extends CoreEntry {
    type: "hospital"
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry;

