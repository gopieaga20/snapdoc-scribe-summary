
import React from 'react';

interface AnatomyDisplayProps {
  imageSrc: string;
}

const AnatomyDisplay = ({ imageSrc }: AnatomyDisplayProps) => {
  return (
    <div className="bg-white rounded-md p-2 h-full flex items-center justify-center border border-gray-200 shadow-sm">
      <img 
        src={imageSrc} 
        alt="Human anatomy" 
        className="max-h-full max-w-full object-contain" 
      />
    </div>
  );
};

export default AnatomyDisplay;
