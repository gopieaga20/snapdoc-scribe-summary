
import React, { useEffect, useState } from 'react';

interface TranscriptionLine {
  text: string;
  timestamp: string;
}

interface PatientSummaryProps {
  transcriptionLines: TranscriptionLine[];
}

// Mock function to generate a summary from transcription
const generateSummary = (transcription: string) => {
  // This would be replaced with actual NLP/AI processing
  
  // Basic keyword extraction to simulate AI summary generation
  const symptoms = [];
  const diagnosis = [];
  const nextSteps = [];
  
  const transcriptionLower = transcription.toLowerCase();
  
  if (transcriptionLower.includes('pain') || transcriptionLower.includes('ache')) {
    symptoms.push('Patient reports pain');
  }
  
  if (transcriptionLower.includes('fever') || transcriptionLower.includes('temperature')) {
    symptoms.push('Fever noted');
  }
  
  if (transcriptionLower.includes('headache')) {
    symptoms.push('Headache');
  }
  
  if (transcriptionLower.includes('cough')) {
    symptoms.push('Persistent cough');
  }
  
  if (transcriptionLower.includes('throat') || transcriptionLower.includes('sore')) {
    symptoms.push('Sore throat');
  }
  
  // Simple diagnosis logic
  if (symptoms.length > 2) {
    diagnosis.push('Possible upper respiratory infection');
  } else if (transcriptionLower.includes('headache') && transcriptionLower.includes('light')) {
    diagnosis.push('Potential migraine');
  } else if (symptoms.length > 0) {
    diagnosis.push('Symptoms require further assessment');
  } else {
    diagnosis.push('Insufficient information for diagnosis');
  }
  
  // Next steps
  if (diagnosis[0].includes('infection')) {
    nextSteps.push('Recommend symptomatic treatment');
    nextSteps.push('Monitor for 48-72 hours');
  } else {
    nextSteps.push('Further diagnostic tests recommended');
    nextSteps.push('Follow-up in 1 week');
  }
  
  return {
    symptoms: symptoms.length > 0 ? symptoms : ['No symptoms detected in conversation'],
    diagnosis,
    nextSteps
  };
};

const PatientSummary = ({ transcriptionLines }: PatientSummaryProps) => {
  const [summary, setSummary] = useState({
    symptoms: ['No symptoms detected yet'],
    diagnosis: ['Waiting for more information'],
    nextSteps: ['Conduct full patient interview']
  });
  
  useEffect(() => {
    if (transcriptionLines.length > 0) {
      const fullTranscript = transcriptionLines.map(line => line.text).join(' ');
      const generatedSummary = generateSummary(fullTranscript);
      setSummary(generatedSummary);
    }
  }, [transcriptionLines]);

  return (
    <div className="bg-white rounded-md p-4 h-full overflow-y-auto border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-medical-teal">Patient Summary</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-medical-blue">Symptoms:</h3>
          <ul className="list-disc pl-5 text-sm">
            {summary.symptoms.map((symptom, index) => (
              <li key={`symptom-${index}`}>{symptom}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-medical-blue">Diagnosis:</h3>
          <ul className="list-disc pl-5 text-sm">
            {summary.diagnosis.map((item, index) => (
              <li key={`diagnosis-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-medical-blue">Next Steps:</h3>
          <ul className="list-disc pl-5 text-sm">
            {summary.nextSteps.map((step, index) => (
              <li key={`step-${index}`}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
