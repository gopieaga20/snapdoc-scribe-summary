
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TranscriptionLine {
  text: string;
  timestamp: string;
}

interface VoiceTranscriberProps {
  onUpdateTranscription: (lines: TranscriptionLine[]) => void;
}

const VoiceTranscriber = ({ onUpdateTranscription }: VoiceTranscriberProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcriptionLines, setTranscriptionLines] = useState<TranscriptionLine[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition when component mounts
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
          
        if (event.results[0].isFinal) {
          const now = new Date();
          const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          const newLine: TranscriptionLine = {
            text: currentTranscript,
            timestamp: timestamp
          };
          
          const updatedLines = [...transcriptionLines, newLine];
          setTranscriptionLines(updatedLines);
          onUpdateTranscription(updatedLines);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error("Speech recognition failed. Please try again.");
      };
      
      setRecognition(recognitionInstance);
    } else {
      toast.error("Speech recognition is not supported in your browser.");
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [transcriptionLines, onUpdateTranscription]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Speech recognition is not available.");
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast.info("Listening...");
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={toggleListening}
        className={`rounded-full h-14 w-14 flex items-center justify-center ${
          isListening ? 'bg-medical-teal animate-pulse' : 'bg-medical-blue'
        }`}
      >
        {isListening ? <Mic size={24} /> : <MicOff size={24} />}
      </Button>
    </div>
  );
};

export default VoiceTranscriber;
