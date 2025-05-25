import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TreatmentPlannerPage from './pages/TreatmentPlannerPage';
import HealthDiagnosisPage from './pages/HealthDiagnosisPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/treatment-planner" element={<TreatmentPlannerPage />} />
        <Route path="/health-diagnosis" element={<HealthDiagnosisPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;