// import React, { useState } from 'react';
// import {
//   Heart, Calendar, Clock, User, Plus, X, Check, Clipboard,
//   ChevronRight, FileText, Save, ArrowLeft
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
//
// // Define treatment plan interface
// interface TreatmentPlan {
//   id: string;
//   patientName: string;
//   diagnosis: string;
//   startDate: string;
//   duration: string;
//   treatments: Treatment[];
//   notes: string;
// }
//
// interface Treatment {
//   id: string;
//   name: string;
//   frequency: string;
//   duration: string;
//   instructions: string;
// }
//
// const TreatmentPlannerPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing');
//   const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);
//
//   // Mock data for treatment plans
//   const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([
//     {
//       id: '1',
//       patientName: 'John Smith',
//       diagnosis: 'Hypertension',
//       startDate: '2025-05-15',
//       duration: '3 months',
//       treatments: [
//         {
//           id: 't1',
//           name: 'Lisinopril',
//           frequency: 'Once daily',
//           duration: '3 months',
//           instructions: 'Take 10mg in the morning with water'
//         },
//         {
//           id: 't2',
//           name: 'Dietary Modifications',
//           frequency: 'Daily',
//           duration: 'Ongoing',
//           instructions: 'Reduce sodium intake to less than 2g per day'
//         }
//       ],
//       notes: 'Patient to return for follow-up in 4 weeks for blood pressure check.'
//     },
//     {
//       id: '2',
//       patientName: 'Sarah Johnson',
//       diagnosis: 'Type 2 Diabetes',
//       startDate: '2025-06-01',
//       duration: '6 months',
//       treatments: [
//         {
//           id: 't1',
//           name: 'Metformin',
//           frequency: 'Twice daily',
//           duration: '6 months',
//           instructions: 'Take 500mg with breakfast and dinner'
//         },
//         {
//           id: 't2',
//           name: 'Blood Glucose Monitoring',
//           frequency: '3 times daily',
//           duration: 'Ongoing',
//           instructions: 'Check before meals and record values'
//         }
//       ],
//       notes: 'Dietary consultation scheduled for next week.'
//     }
//   ]);
//
//   // New treatment plan form state
//   const [newPlan, setNewPlan] = useState<TreatmentPlan>({
//     id: String(Date.now()),
//     patientName: '',
//     diagnosis: '',
//     startDate: '',
//     duration: '',
//     treatments: [],
//     notes: ''
//   });
//
//   // New treatment form state
//   const [newTreatment, setNewTreatment] = useState<Treatment>({
//     id: String(Date.now()),
//     name: '',
//     frequency: '',
//     duration: '',
//     instructions: ''
//   });
//
//   const [showAddTreatment, setShowAddTreatment] = useState(false);
//
//   const handleAddTreatment = () => {
//     if (newTreatment.name && newTreatment.frequency) {
//       setNewPlan({
//         ...newPlan,
//         treatments: [...newPlan.treatments, { ...newTreatment, id: String(Date.now()) }]
//       });
//       setNewTreatment({
//         id: String(Date.now()),
//         name: '',
//         frequency: '',
//         duration: '',
//         instructions: ''
//       });
//       setShowAddTreatment(false);
//     }
//   };
//
//   const handleRemoveTreatment = (id: string) => {
//     setNewPlan({
//       ...newPlan,
//       treatments: newPlan.treatments.filter(t => t.id !== id)
//     });
//   };
//
//   const handleCreatePlan = () => {
//     if (newPlan.patientName && newPlan.diagnosis) {
//       setTreatmentPlans([...treatmentPlans, { ...newPlan, id: String(Date.now()) }]);
//       setNewPlan({
//         id: String(Date.now()),
//         patientName: '',
//         diagnosis: '',
//         startDate: '',
//         duration: '',
//         treatments: [],
//         notes: ''
//       });
//       setActiveTab('existing');
//     }
//   };
//
//   return (
//     <div className="min-h-screen pt-16">
//       <div className="bg-gradient-to-r from-primary-700 to-primary-900 py-16 px-4">
//         <div className="container mx-auto">
//           <div className="flex items-center mb-6">
//             <Link to="/" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
//               <ArrowLeft size={16} />
//               <span>Back to Home</span>
//             </Link>
//           </div>
//           <div className="flex items-center mb-4">
//             <Heart className="text-white mr-3" size={32} />
//             <h1 className="text-3xl md:text-4xl font-bold text-white">Treatment Planner</h1>
//           </div>
//           <p className="text-white/90 text-lg max-w-2xl">
//             Create, manage, and track personalized treatment plans for your patients with our comprehensive planning tool.
//           </p>
//         </div>
//       </div>
//
//       <div className="container mx-auto px-4 py-8">
//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 mb-6">
//           <button
//             className={`px-6 py-3 font-medium text-sm flex items-center ${
//               activeTab === 'existing'
//                 ? 'border-b-2 border-primary-600 text-primary-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('existing')}
//           >
//             <Clipboard className="mr-2" size={18} />
//             Existing Plans
//           </button>
//           <button
//             className={`px-6 py-3 font-medium text-sm flex items-center ${
//               activeTab === 'new'
//                 ? 'border-b-2 border-primary-600 text-primary-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('new')}
//           >
//             <Plus className="mr-2" size={18} />
//             Create New Plan
//           </button>
//         </div>
//
//         {/* Tab Content */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           {activeTab === 'existing' ? (
//             <div className="animate-fade-in">
//               {selectedPlan ? (
//                 <div>
//                   <button
//                     className="flex items-center text-primary-600 mb-6 hover:underline"
//                     onClick={() => setSelectedPlan(null)}
//                   >
//                     <ArrowLeft size={16} className="mr-1" />
//                     Back to all plans
//                   </button>
//
//                   <div className="bg-gray-50 rounded-lg p-6 mb-6">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                           {selectedPlan.patientName}
//                         </h2>
//                         <div className="flex items-center text-gray-600 mb-1">
//                           <User size={16} className="mr-2" />
//                           Diagnosis: {selectedPlan.diagnosis}
//                         </div>
//                         <div className="flex items-center text-gray-600 mb-1">
//                           <Calendar size={16} className="mr-2" />
//                           Start Date: {selectedPlan.startDate}
//                         </div>
//                         <div className="flex items-center text-gray-600">
//                           <Clock size={16} className="mr-2" />
//                           Duration: {selectedPlan.duration}
//                         </div>
//                       </div>
//
//                       <div className="flex gap-2">
//                         <button className="btn btn-outline">
//                           <FileText size={16} />
//                           Export
//                         </button>
//                         <button className="btn btn-primary">
//                           <Save size={16} />
//                           Save Changes
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//
//                   <h3 className="text-xl font-semibold mb-4">Treatment Regimen</h3>
//                   <div className="space-y-4 mb-6">
//                     {selectedPlan.treatments.map((treatment) => (
//                       <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
//                         <h4 className="font-semibold text-gray-900">{treatment.name}</h4>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
//                           <div>
//                             <p className="text-sm text-gray-500">Frequency</p>
//                             <p>{treatment.frequency}</p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Duration</p>
//                             <p>{treatment.duration}</p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Instructions</p>
//                             <p>{treatment.instructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Notes</h3>
//                     <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                       <p>{selectedPlan.notes}</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Existing Treatment Plans</h2>
//
//                   {treatmentPlans.length > 0 ? (
//                     <div className="divide-y divide-gray-200">
//                       {treatmentPlans.map((plan) => (
//                         <div
//                           key={plan.id}
//                           className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded-md transition-colors"
//                           onClick={() => setSelectedPlan(plan)}
//                         >
//                           <div>
//                             <h3 className="font-medium text-gray-900">{plan.patientName}</h3>
//                             <p className="text-gray-600 text-sm">{plan.diagnosis}</p>
//                           </div>
//                           <div className="flex items-center">
//                             <span className="text-sm text-gray-500 mr-4">Started: {plan.startDate}</span>
//                             <ChevronRight size={20} className="text-gray-400" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <p className="text-gray-500 mb-4">No treatment plans found</p>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => setActiveTab('new')}
//                       >
//                         <Plus size={16} />
//                         Create New Plan
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="animate-fade-in">
//               <h2 className="text-xl font-semibold mb-6">Create New Treatment Plan</h2>
//
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Patient Name
//                     </label>
//                     <input
//                       type="text"
//                       className="input"
//                       placeholder="Enter patient name"
//                       value={newPlan.patientName}
//                       onChange={(e) => setNewPlan({...newPlan, patientName: e.target.value})}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Diagnosis
//                     </label>
//                     <input
//                       type="text"
//                       className="input"
//                       placeholder="Enter diagnosis"
//                       value={newPlan.diagnosis}
//                       onChange={(e) => setNewPlan({...newPlan, diagnosis: e.target.value})}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       className="input"
//                       value={newPlan.startDate}
//                       onChange={(e) => setNewPlan({...newPlan, startDate: e.target.value})}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duration
//                     </label>
//                     <input
//                       type="text"
//                       className="input"
//                       placeholder="e.g., 3 months"
//                       value={newPlan.duration}
//                       onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
//                     />
//                   </div>
//                 </div>
//
//                 <div>
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-medium">Treatments</h3>
//                     <button
//                       className="btn btn-outline py-1 px-3"
//                       onClick={() => setShowAddTreatment(true)}
//                     >
//                       <Plus size={16} />
//                       Add Treatment
//                     </button>
//                   </div>
//
//                   {showAddTreatment && (
//                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 animate-fade-in">
//                       <div className="flex justify-between items-center mb-4">
//                         <h4 className="font-medium">New Treatment</h4>
//                         <button
//                           className="text-gray-500 hover:text-gray-700"
//                           onClick={() => setShowAddTreatment(false)}
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Treatment Name
//                           </label>
//                           <input
//                             type="text"
//                             className="input"
//                             placeholder="e.g., Medication, Therapy"
//                             value={newTreatment.name}
//                             onChange={(e) => setNewTreatment({...newTreatment, name: e.target.value})}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Frequency
//                           </label>
//                           <input
//                             type="text"
//                             className="input"
//                             placeholder="e.g., Once daily, Twice weekly"
//                             value={newTreatment.frequency}
//                             onChange={(e) => setNewTreatment({...newTreatment, frequency: e.target.value})}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Duration
//                           </label>
//                           <input
//                             type="text"
//                             className="input"
//                             placeholder="e.g., 2 weeks, Ongoing"
//                             value={newTreatment.duration}
//                             onChange={(e) => setNewTreatment({...newTreatment, duration: e.target.value})}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Instructions
//                           </label>
//                           <input
//                             type="text"
//                             className="input"
//                             placeholder="Enter specific instructions"
//                             value={newTreatment.instructions}
//                             onChange={(e) => setNewTreatment({...newTreatment, instructions: e.target.value})}
//                           />
//                         </div>
//                       </div>
//
//                       <div className="flex justify-end">
//                         <button
//                           className="btn btn-primary py-1"
//                           onClick={handleAddTreatment}
//                         >
//                           <Check size={16} />
//                           Add to Plan
//                         </button>
//                       </div>
//                     </div>
//                   )}
//
//                   {newPlan.treatments.length > 0 ? (
//                     <div className="space-y-3">
//                       {newPlan.treatments.map((treatment) => (
//                         <div key={treatment.id} className="border border-gray-200 rounded-lg p-3 flex justify-between">
//                           <div>
//                             <p className="font-medium">{treatment.name}</p>
//                             <p className="text-sm text-gray-600">
//                               {treatment.frequency} | {treatment.duration}
//                             </p>
//                           </div>
//                           <button
//                             className="text-gray-400 hover:text-red-500"
//                             onClick={() => handleRemoveTreatment(treatment.id)}
//                           >
//                             <X size={20} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center border border-dashed border-gray-300 rounded-lg py-8 bg-gray-50">
//                       <p className="text-gray-500 mb-2">No treatments added yet</p>
//                       <button
//                         className="text-primary-600 hover:text-primary-700 font-medium"
//                         onClick={() => setShowAddTreatment(true)}
//                       >
//                         + Add a treatment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Notes
//                   </label>
//                   <textarea
//                     className="input min-h-[100px]"
//                     placeholder="Enter any additional notes about the treatment plan"
//                     value={newPlan.notes}
//                     onChange={(e) => setNewPlan({...newPlan, notes: e.target.value})}
//                   ></textarea>
//                 </div>
//
//                 <div className="flex justify-end gap-3">
//                   <button
//                     className="btn btn-outline"
//                     onClick={() => {
//                       setNewPlan({
//                         id: String(Date.now()),
//                         patientName: '',
//                         diagnosis: '',
//                         startDate: '',
//                         duration: '',
//                         treatments: [],
//                         notes: ''
//                       });
//                     }}
//                   >
//                     Clear Form
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleCreatePlan}
//                     disabled={!newPlan.patientName || !newPlan.diagnosis}
//                   >
//                     <Save size={16} />
//                     Save Treatment Plan
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default TreatmentPlannerPage;
// # TreatmentPlannerPage.tsx
// Page: Main wrapper that connects all subcomponents

// #region Imports
// # TreatmentPlannerPage.tsx
// Page: Main wrapper that connects all subcomponents
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity, BrainCircuit } from "lucide-react";

import PatientInputForm from "@/components/PatientInputForm";
import TreatmentPlanDisplay from "@/components/TreatmentPlanDisplay";
import ExportButtons from "@/components/ExportButtons";
import { generateTreatmentPlan } from "@/components/TreatmentPlanGenerator";

const SlidingIcon = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <BrainCircuit
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`transition-transform duration-300 ${
        hovered ? "translate-x-1 text-sky-600" : "translate-x-0 text-blue-900"
      }`}
      size={28}
    />
  );
};

const TreatmentPlannerPage = () => {
  const [patientData, setPatientData] = useState({
    disease: "",
    age: "",
    duration: "",
    symptoms: "",
    bloodGroup: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    const response = await generateTreatmentPlan(patientData);
    setPlan(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 text-slate-800">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="text-blue-700 hover:text-blue-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
  <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-12">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
      AI Treatment Planner
      <BrainCircuit className="text-white" size={28} />
    </h1>
    <p className="text-lg text-teal-100 max-w-2xl mx-auto">
      Fill in the patient’s basic health details to generate an AI-powered treatment plan.
      Designed for clinical use and precision support.
    </p>
  </div>
</div>

          {/* Form and Results */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-gray-900">
            <PatientInputForm
              patientData={patientData}
              onChange={handleChange}
              onSubmit={handleGenerate}
            />

            {loading && <p className="text-center mt-4 text-blue-600">Generating treatment plan...</p>}

            {plan && (
              <>
                <TreatmentPlanDisplay plan={plan} />
                <ExportButtons content={plan} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlannerPage;
