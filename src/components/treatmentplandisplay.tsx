// # TreatmentPlanDisplay.tsx
// Component: Treatment Plan Display — Shows generated output

interface Props {
  plan: string;
}

const TreatmentPlanDisplay: React.FC<Props> = ({ plan }) => {
  return (
    <div className="mt-6 p-6 bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-xl border shadow-sm">
  <h2 className="text-xl font-bold mb-4 text-emerald-800">Generated Treatment Plan</h2>
  <pre className="text-sm text-gray-800 whitespace-pre-line">{plan}</pre>
</div>

  );
};

export default TreatmentPlanDisplay;
