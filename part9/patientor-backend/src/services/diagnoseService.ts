import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

const findDiagnose = (code: string): Diagnose | undefined => {
    const diagnose = diagnoses.find(d => d.code === code);
    return diagnose;
};


export default {
    getDiagnoses,
    findDiagnose
};