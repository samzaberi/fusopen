import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";


const PatientDetails = () => {
    const [patient, setPatient] = useState<Patient>();
    const id: string = useParams<{ id: string }>().id;
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patient);

                // const entries = patient.entries ? patient.entries : [];
                // const diagnoseCodes = entries.map(e => e.diagnoseCodes).flat();
                // const uniqDiagnoseCodes = [...new Set(diagnoseCodes)];
                // for (const dg of uniqDiagnoseCodes) {
                //     const { data: diagnosis } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${dg}`);
                //     setDiagnoses(diagnoses?.concat(diagnosis));
                // }


            } catch (error) {
                console.error(error.message);
            }
        };
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                setDiagnoses(diagnoses);
            } catch (error) {
                console.error(error.message);
            }

        };

        void fetchPatient();
        void fetchDiagnoses();
    });


    return (
        <div>
            <h2>patient details</h2>
            <div>
                name: {patient?.name}<br />
                birthday: {patient?.dateOfBirth}<br />
                social security: {patient?.ssn}<br />
                gender: {patient?.gender}<br />
                occupation: {patient?.occupation}<br />
            </div>
            <h3>entries</h3>
            <div>
                {patient?.entries?.map(e =>
                    <div key={e.id}>
                        {e.date}: {e.description}<br />
                        <ul>
                            {e.diagnoseCodes.map(d => {
                                const diagnosis = diagnoses?.find(dg => dg.code = d);
                                return <li key={d}>{d} {diagnosis?.name}</li>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;