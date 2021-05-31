import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";


const PatientDetails = () => {
    const [patient, setPatient] = useState<Patient>();
    const id: string = useParams<{ id: string }>().id;
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patient);
                const { data: diagnos } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                setDiagnoses(diagnoses.concat(diagnos));

            } catch (error) {
                console.error(error.message);
            }
        };
        void fetchPatientData();

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
                        {e.date}: {e.type}<br />
                        {e.description}<br />
                        specialist: {e.specialist}<br />
                        discharged {e.discharge.date}: {e.discharge.criteria}<br />
                        diagnoses:<br />
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