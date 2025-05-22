
import React from 'react';

interface TranscriptionLine {
  text: string;
  timestamp: string;
}

interface TranscriptionDisplayProps {
  lines: TranscriptionLine[];
}

const TranscriptionDisplay = ({ lines }: TranscriptionDisplayProps) => {
  return (
    <div className="bg-white rounded-md p-4 h-72 overflow-y-auto border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-medical-gray">Transcription</h2>
      
      {lines.length === 0 ? (
        <p className="text-gray-400 italic">No transcription yet. Click the microphone button and start speaking.</p>
      ) : (
        <div className="space-y-2">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              <span className="text-xs text-medical-teal w-12 pt-0.5">
                {line.timestamp}
              </span>
              <p className="text-sm flex-1">{line.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranscriptionDisplay;
