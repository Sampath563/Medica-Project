export const generateTreatmentPlan = async (patientData: any): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { disease, age, duration, symptoms, bloodGroup } = patientData;
      const ageNum = parseInt(age);
      const durationNum = parseInt(duration);
      const diseaseLower = disease?.toLowerCase() || "";
      const symptomsLower = symptoms?.toLowerCase() || "";

      // Define core meds and advice per disease
      const diseaseProtocols: { [key: string]: { meds: string[]; lifestyle: string[]; followUp: string } } = {
        diabetes: {
          meds: [
            ageNum > 65 ? "Insulin therapy (adjusted dose)" : "Metformin 500mg twice daily",
            "Regular blood sugar monitoring",
            "Consider GLP-1 receptor agonists if needed"
          ],
          lifestyle: [
            "Maintain a low sugar, high fiber diet",
            "Engage in regular moderate exercise",
            "Avoid smoking and alcohol"
          ],
          followUp: durationNum > 30
            ? "Schedule specialist endocrinologist review within 2 weeks."
            : "Follow up with primary care in 4 weeks for HbA1c check."
        },
        hypertension: {
          meds: [
            ageNum > 60 ? "Start with low-dose Amlodipine 5mg" : "Losartan 50mg once daily",
            "Monitor blood pressure at home daily",
            "Add Hydrochlorothiazide if needed after 4 weeks"
          ],
          lifestyle: [
            "Limit salt intake to under 2g daily",
            "Practice stress reduction techniques",
            "Maintain a healthy weight"
          ],
          followUp: durationNum > 30
            ? "Refer to cardiologist for further evaluation."
            : "Repeat blood pressure check in 2 weeks."
        },
        fever: {
          meds: [
            "Paracetamol 500mg every 6 hours as needed",
            symptomsLower.includes("high fever") ? "Add Ibuprofen 400mg for inflammation" : ""
          ].filter(Boolean),
          lifestyle: [
            "Stay hydrated with water and electrolytes",
            "Rest adequately",
            "Avoid strenuous activity"
          ],
          followUp: "If fever persists beyond 3 days or worsens, consult a physician."
        },
        headache: {
          meds: [
            "Ibuprofen 400mg as needed",
            symptomsLower.includes("migraine") ? "Consider Sumatriptan 50mg (consult doctor)" : ""
          ].filter(Boolean),
          lifestyle: [
            "Maintain regular sleep patterns",
            "Avoid known headache triggers",
            "Practice relaxation and stress management"
          ],
          followUp: "If headaches increase in frequency or severity, seek specialist care."
        },
        general: {
          meds: ["Multivitamins once daily", "Vitamin D3 1000 IU daily"],
          lifestyle: [
            "Maintain balanced diet",
            "Exercise moderately",
            "Keep hydrated"
          ],
          followUp: "Routine check-up in 1 month or as needed."
        }
      };

      // Select protocol based on disease, fallback to general
      const protocol = Object.keys(diseaseProtocols).find(key => diseaseLower.includes(key)) || "general";
      const { meds, lifestyle, followUp } = diseaseProtocols[protocol];

      // Extra notes based on age/duration
      let extraNotes = "";
      if (ageNum > 70) {
        extraNotes += "⚠️ Elderly patient: Monitor medication side effects closely.\n";
      }
      if (durationNum > 60) {
        extraNotes += "⚠️ Long duration condition: Consider specialist referral.\n";
      }
      if (bloodGroup) {
        extraNotes += `🩸 Blood Group noted: ${bloodGroup}.\n`;
      }

      const plan = `
📋 AI Treatment Plan for ${disease || "General Condition"}
- Age: ${age}
- Duration (days): ${duration}
- Symptoms: ${symptoms}
- Blood Group: ${bloodGroup || "Not provided"}

🧪 Recommended Medications:
${meds.map((m, i) => `${i + 1}. ${m}`).join("\n")}

🧘 Lifestyle Recommendations:
${lifestyle.map((l, i) => `${i + 1}. ${l}`).join("\n")}

📅 Follow-up:
${followUp}

${extraNotes.trim()}
      `;

      resolve(plan.trim());
    }, 1500);
  });
};
