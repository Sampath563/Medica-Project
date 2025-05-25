import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, ArrowLeft, Search, PlusCircle, FileText, User, 
  Calendar, ListChecks, ChevronDown, ChevronUp, Clipboard,
  AlertCircle, CheckCircle, BarChart, ArrowRight, Check, X
} from 'lucide-react';

// Define interfaces
interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

interface VitalSign {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'abnormal' | 'critical';
}

interface DiagnosticResult {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
}

const HealthDiagnosisPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    medicalHistory: '',
  });

  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [newSymptom, setNewSymptom] = useState<Symptom>({
    id: '',
    name: '',
    severity: 'moderate',
    duration: '',
  });

  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    { name: 'Blood Pressure', value: '', unit: 'mmHg', status: 'normal' },
    { name: 'Heart Rate', value: '', unit: 'bpm', status: 'normal' },
    { name: 'Temperature', value: '', unit: '°C', status: 'normal' },
    { name: 'Respiratory Rate', value: '', unit: 'breaths/min', status: 'normal' },
    { name: 'Oxygen Saturation', value: '', unit: '%', status: 'normal' },
  ]);

  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosticResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle adding a new symptom
  const handleAddSymptom = () => {
    if (newSymptom.name && newSymptom.duration) {
      setSymptoms([...symptoms, { ...newSymptom, id: String(Date.now()) }]);
      setNewSymptom({
        id: '',
        name: '',
        severity: 'moderate',
        duration: '',
      });
    }
  };

  // Handle removing a symptom
  const handleRemoveSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  // Update vital sign value
  const handleVitalSignChange = (index: number, value: string) => {
    const updatedVitalSigns = [...vitalSigns];
    updatedVitalSigns[index].value = value;
    
    // Simple logic for status (in a real app this would be more sophisticated)
    if (updatedVitalSigns[index].name === 'Blood Pressure') {
      const systolic = parseInt(value.split('/')[0] || '0');
      if (systolic > 140) updatedVitalSigns[index].status = 'abnormal';
      else if (systolic > 160) updatedVitalSigns[index].status = 'critical';
      else updatedVitalSigns[index].status = 'normal';
    } else if (updatedVitalSigns[index].name === 'Heart Rate') {
      const rate = parseInt(value || '0');
      if (rate > 100 || rate < 60) updatedVitalSigns[index].status = 'abnormal';
      else if (rate > 120 || rate < 50) updatedVitalSigns[index].status = 'critical';
      else updatedVitalSigns[index].status = 'normal';
    }
    
    setVitalSigns(updatedVitalSigns);
  };

  // Generate diagnosis (mock function)
  const generateDiagnosis = () => {
    // In a real app, this would make an API call to a diagnostic engine
    // For now, we'll use mock data based on symptoms
    
    // Simulate a short loading time
    setShowResults(true);
    
    setTimeout(() => {
      const mockDiagnoses: DiagnosticResult[] = [
        {
          condition: 'Upper Respiratory Infection',
          probability: 0.78,
          description: 'A common viral infection affecting the nose, throat, and airways.',
          recommendations: [
            'Rest and drink plenty of fluids',
            'Over-the-counter pain relievers may help with symptoms',
            'Follow-up in 7 days if symptoms persist'
          ]
        },
        {
          condition: 'Seasonal Allergies',
          probability: 0.45,
          description: 'An immune response to environmental triggers like pollen or dust.',
          recommendations: [
            'Antihistamines may provide relief',
            'Avoid known allergens when possible',
            'Consider allergy testing if symptoms are recurrent'
          ]
        },
        {
          condition: 'Viral Sinusitis',
          probability: 0.32,
          description: 'Inflammation of the sinuses, often following a cold.',
          recommendations: [
            'Nasal irrigation may help clear congestion',
            'Decongestants for short-term use only',
            'Antibiotics not recommended for viral causes'
          ]
        }
      ];
      
      setDiagnosisResults(mockDiagnoses);
      setStep(4);
    }, 2000);
  };

  // Function to go to next step
  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
    if (step === 3) generateDiagnosis();
  };

  // Function to go to previous step
  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
    if (step === 4) setShowResults(false);
  };

  // Determine if the current step is complete
  const isStepComplete = () => {
    switch (step) {
      case 1:
        return patientInfo.name && patientInfo.age && patientInfo.gender;
      case 2:
        return symptoms.length > 0;
      case 3:
        return vitalSigns.some(vs => vs.value !== '');
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-r from-secondary-700 to-secondary-900 py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center mb-4 justify-center">
  <Activity className="text-white mr-3" size={32} />
  <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
    Health Diagnosis
  </h1>
</div>

          <p className="text-white/90 text-lg max-w-2xl mx-auto text-center">
  Our diagnostic engine analyzes symptoms and vital signs to provide potential health conditions and recommendations.
</p>

        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b border-gray-200">
            <div className="flex justify-between px-6 py-4">
              <div className="flex space-x-8">
                <StepIndicator 
                  number={1} 
                  title="Patient Information" 
                  active={step === 1} 
                  completed={step > 1} 
                />
                <StepIndicator 
                  number={2} 
                  title="Symptoms" 
                  active={step === 2} 
                  completed={step > 2} 
                />
                <StepIndicator 
                  number={3} 
                  title="Vital Signs" 
                  active={step === 3} 
                  completed={step > 3} 
                />
                <StepIndicator 
                  number={4} 
                  title="Diagnosis" 
                  active={step === 4} 
                  completed={false} 
                />
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6">
            {/* Step 1: Patient Information */}
            {step === 1 && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center mb-4">
                  <User className="text-secondary-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Patient Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter patient name"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="Enter age"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      className="input"
                      value={patientInfo.gender}
                      onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="Enter height"
                      value={patientInfo.height}
                      onChange={(e) => setPatientInfo({...patientInfo, height: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="Enter weight"
                      value={patientInfo.weight}
                      onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relevant Medical History
                    </label>
                    <textarea
                      className="input min-h-[100px]"
                      placeholder="Enter any relevant medical history, allergies, or current medications"
                      value={patientInfo.medicalHistory}
                      onChange={(e) => setPatientInfo({...patientInfo, medicalHistory: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">* Required fields</div>
              </div>
            )}
            
            {/* Step 2: Symptoms */}
            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center mb-4">
                  <ListChecks className="text-secondary-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Symptoms</h2>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Symptom Name *
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="e.g., Headache, Fever"
                        value={newSymptom.name}
                        onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity
                      </label>
                      <select
                        className="input"
                        value={newSymptom.severity}
                        onChange={(e) => setNewSymptom({...newSymptom, severity: e.target.value as 'mild' | 'moderate' | 'severe'})}
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="e.g., 2 days, 1 week"
                        value={newSymptom.duration}
                        onChange={(e) => setNewSymptom({...newSymptom, duration: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="btn btn-primary"
                      onClick={handleAddSymptom}
                      disabled={!newSymptom.name || !newSymptom.duration}
                    >
                      <PlusCircle size={16} />
                      Add Symptom
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Current Symptoms</h3>
                  
                  {symptoms.length > 0 ? (
                    <div className="space-y-3">
                      {symptoms.map((symptom) => (
                        <div key={symptom.id} className="border border-gray-200 rounded-lg p-3 flex justify-between bg-white">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <span className={`inline-block w-3 h-3 rounded-full ${
                                symptom.severity === 'mild' ? 'bg-green-500' :
                                symptom.severity === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></span>
                            </div>
                            <div>
                              <p className="font-medium">{symptom.name}</p>
                              <p className="text-sm text-gray-600">
                                {symptom.severity} • {symptom.duration}
                              </p>
                            </div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => handleRemoveSymptom(symptom.id)}
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center border border-dashed border-gray-300 rounded-lg py-8 bg-gray-50">
                      <p className="text-gray-500 mb-2">No symptoms added yet</p>
                      <p className="text-sm text-gray-400">
                        Use the form above to add patient symptoms
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 3: Vital Signs */}
            {step === 3 && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center mb-4">
                  <BarChart className="text-secondary-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Vital Signs</h2>
                </div>
                
                <div className="space-y-4">
                  {vitalSigns.map((vitalSign, index) => (
                    <div key={vitalSign.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-center">
                        <div className="mb-2 md:mb-0">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {vitalSign.name}
                          </label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              className="input max-w-[180px]"
                              placeholder={`Enter ${vitalSign.name.toLowerCase()}`}
                              value={vitalSign.value}
                              onChange={(e) => handleVitalSignChange(index, e.target.value)}
                            />
                            <span className="ml-2 text-gray-500">{vitalSign.unit}</span>
                            
                            {vitalSign.value && (
                              <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                                vitalSign.status === 'normal' ? 'bg-green-100 text-green-800' :
                                vitalSign.status === 'abnormal' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {vitalSign.status}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {vitalSign.name === 'Blood Pressure' && (
                            <span>Format: systolic/diastolic (e.g., 120/80)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 flex items-start">
                  <AlertCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <p className="text-sm">
                    Enter as many vital signs as are available. More data leads to more accurate 
                    diagnostic suggestions. If a measurement is not available, you can leave it blank.
                  </p>
                </div>
              </div>
            )}
            
            {/* Step 4: Diagnosis Results */}
            {step === 4 && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center mb-4">
                  <Clipboard className="text-secondary-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Diagnostic Results</h2>
                </div>
                
                {showResults ? (
                  <div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex flex-wrap gap-4 justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{patientInfo.name}</h3>
                          <p className="text-gray-500">
                            {patientInfo.age} years • {patientInfo.gender}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-outline">
                            <FileText size={16} />
                            Export Report
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {diagnosisResults.length > 0 ? (
                      <div className="space-y-4">
                        {diagnosisResults.map((result, index) => (
                          <DiagnosisCard 
                            key={index}
                            result={result}
                            isTop={index === 0}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Generating diagnostic results...</p>
                        <div className="mt-4 flex justify-center">
                          <div className="animate-pulse flex space-x-4">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 flex items-start">
                      <AlertCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Important Disclaimer</p>
                        <p>
                          These results are generated by an AI diagnostic system and are not a substitute 
                          for professional medical advice, diagnosis, or treatment. Always consult with 
                          a qualified healthcare provider for medical concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-block p-4 bg-secondary-100 rounded-full mb-4">
                      <Search className="text-secondary-600" size={32} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analyzing Patient Data</h3>
                    <p className="text-gray-500 mb-6">
                      Our diagnostic engine is analyzing the symptoms and vital signs to generate potential conditions.
                    </p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
                      <div className="h-2 bg-secondary-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <button 
                className="btn btn-outline"
                onClick={handlePrevStep}
                disabled={step === 1}
              >
                Previous
              </button>
              
              <button 
                className={`btn ${isStepComplete() ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={handleNextStep}
                disabled={!isStepComplete()}
              >
                {step < 3 ? 'Next' : step === 3 ? 'Generate Diagnosis' : 'Complete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ number, title, active, completed }) => {
  return (
    <div className="flex items-center">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
          active ? 'bg-secondary-500 text-white' : 
          completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? <Check size={16} /> : number}
      </div>
      <span className={`${active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

interface DiagnosisCardProps {
  result: DiagnosticResult;
  isTop: boolean;
}

const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ result, isTop }) => {
  const [expanded, setExpanded] = useState(isTop);
  
  const probabilityPercentage = Math.round(result.probability * 100);
  
  return (
    <div className={`border rounded-lg overflow-hidden ${
      isTop ? 'border-secondary-300 bg-secondary-50' : 'border-gray-200'
    }`}>
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {isTop && (
            <div className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2 py-1 rounded mr-3">
              Top Match
            </div>
          )}
          <div>
            <h3 className="font-medium">{result.condition}</h3>
            <div className="flex items-center mt-1">
              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className={`h-2 rounded-full ${
                    probabilityPercentage > 70 ? 'bg-green-500' : 
                    probabilityPercentage > 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${probabilityPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{probabilityPercentage}% match</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-200 animate-fade-in">
          <p className="text-gray-700 mb-4">
            {result.description}
          </p>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Recommendations:</h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center">
              View detailed information
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDiagnosisPage;