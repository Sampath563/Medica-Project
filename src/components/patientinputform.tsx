// # PatientInputForm.tsx
// Component: Patient Input Fields — Captures patient details
// # PatientInputForm.tsx
// Component: Patient Input Fields — Captures patient details

// # PatientInputForm.tsx
// Component: Patient Input Fields — Captures patient details

import React from "react";

interface PatientData {
  disease: string;
  age: string;
  duration: string;
  symptoms: string;
  bloodGroup: string;
}

interface Props {
  patientData: PatientData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
}

const PatientInputForm: React.FC<Props> = ({ patientData, onChange, onSubmit }) => {
  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow-md">
      <input
        type="text"
        name="disease"
        placeholder="Disease"
        value={patientData.disease}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={patientData.age}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={patientData.duration}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="symptoms"
        placeholder="Symptoms"
        value={patientData.symptoms}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      <select
        name="bloodGroup"
        value={patientData.bloodGroup}
        onChange={onChange}
        className="select select-bordered w-full"
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>
      <button
  onClick={onSubmit}
  className="btn bg-emerald-300 hover:bg-emerald-400 text-emerald-900 w-full"
>
  Generate Treatment Plan
</button>

    </div>
  );
};

export default PatientInputForm;

