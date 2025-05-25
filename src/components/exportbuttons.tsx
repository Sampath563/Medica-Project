// # ExportButtons.tsx
// Component: Save/Export Plan — Download as .txt

interface Props {
  content: string;
}

const ExportButtons: React.FC<Props> = ({ content }) => {
  const downloadPlan = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "treatment_plan.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
   <button
  onClick={downloadPlan}
  className="btn bg-emerald-200 hover:bg-emerald-400 transition-colors text-emerald-900 font-medium mt-4"
>
  Download Plan
</button>


  );
};

export default ExportButtons;
