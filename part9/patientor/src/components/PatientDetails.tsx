import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";


const PatientDetails = () => {
    const [patient, setPatient] = useState<Patient>();
    const id: string = useParams<{ id: string }>().id;

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patient);
            } catch (error) {
                console.error(error.message);
            }
        };
        void fetchPatient();
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
                            {e.diagnoseCodes.map(d =>
                                <li key={d}>{d}</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;