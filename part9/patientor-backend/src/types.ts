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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}