
import React, { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import VoiceTranscriber from '@/components/VoiceTranscriber';
import TranscriptionDisplay from '@/components/TranscriptionDisplay';
import AnatomyDisplay from '@/components/AnatomyDisplay';
import PatientSummary from '@/components/PatientSummary';

interface TranscriptionLine {
  text: string;
  timestamp: string;
}

const Index = () => {
  const [transcriptionLines, setTranscriptionLines] = useState<TranscriptionLine[]>([]);
  
  const handleUpdateTranscription = (lines: TranscriptionLine[]) => {
    setTranscriptionLines(lines);
  };

  return (
    <div className="fixed inset-0 bg-medical-lightGray flex overflow-hidden">
      {/* App Header */}
      <header className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-medical-blue">Smartle SnapDoc</h1>
      </header>
      
      {/* Main Container - with padding top to account for header */}
      <div className="w-full h-full pt-14 flex">
        {/* Left Side - 50% width */}
        <div className="w-1/2 h-full p-4 flex flex-col">
          {/* Audio Player */}
          <div className="mb-4">
            <AudioPlayer />
          </div>
          
          {/* Voice Input */}
          <div className="flex justify-center">
            <VoiceTranscriber onUpdateTranscription={handleUpdateTranscription} />
          </div>
          
          {/* Transcription Display */}
          <div className="mt-4 flex-grow">
            <TranscriptionDisplay lines={transcriptionLines} />
          </div>
        </div>
        
        {/* Right Side - 50% width */}
        <div className="w-1/2 h-full flex flex-col">
          {/* Top Section - 50% height */}
          <div className="h-1/2 p-4">
            <AnatomyDisplay imageSrc="/lovable-uploads/7494a7d6-3270-46ee-b209-a338b8ce9048.png" />
          </div>
          
          {/* Bottom Section - 50% height */}
          <div className="h-1/2 p-4">
            <PatientSummary transcriptionLines={transcriptionLines} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
