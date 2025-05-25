'use client';
import { useState } from 'react';
import TextInput from './components/TextInput';
import VoiceInput from './components/VoiceInput';
import Result from './components/Result';
import BackgroundEffects from './components/BackgroundEffects';

export default function Home() {
  const [commandText, setCommandText] = useState('');
  const [result, setResult] = useState('');
  const [listening, setListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');

  // Text command submit
  const handleTestSubmit = async () => {
    setResult('Processing...');
    try {
      const res = await fetch('http://127.0.0.1:5000/test-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commandText }),
      });

      const data = await res.json();
      setResult(res.ok ? `Result: ${data.result}` : `Error: ${data.error}`);
    } catch (error) {
      console.error('Request failed:', error);
      setResult('Error connecting to backend');
    }
  };

  // Voice command handler
  const handleVoiceFinalTranscript = async (transcript) => {
    setCommandText(transcript);
    setResult(`You said: "${transcript}". Processing...`);
    
    try {
      const res = await fetch('http://127.0.0.1:5000/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript }),
      });

      const data = await res.json();
      setResult(res.ok ? `Result: ${data.result}` : `Error: ${data.error}`);
    } catch (error) {
      setResult('Error connecting to backend');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 bg-gradient-to-br from-indigo-950 to-purple-900 text-white relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="float-animation relative">
            <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
            <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m2 2H7m4 4h-2m4 0h-2m4 4h-2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent relative">
            Voice Calculator
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-blue-400/50 to-purple-300/50 rounded-full" />
          </h1>
        </div>

        {/* Input Panels */}
        <div className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl">
          <TextInput
            commandText={commandText}
            setCommandText={setCommandText}
            onSubmit={handleTestSubmit}
          />
          <VoiceInput
            onFinalTranscript={handleVoiceFinalTranscript}
            listening={listening}
            setListening={setListening}
            liveTranscript={liveTranscript}
            setLiveTranscript={setLiveTranscript}
          />
        </div>

        {/* Result Display */}
        <Result result={result} />
      </div>
    </main>
  );
}