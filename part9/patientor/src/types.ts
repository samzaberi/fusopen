export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

interface CoreEntry {
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
