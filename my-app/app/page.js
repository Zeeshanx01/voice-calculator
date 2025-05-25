'use client';
import { useState } from 'react';

export default function Home() {
  const [commandText, setCommandText] = useState('');
  const [result, setResult] = useState('');
  const [listening, setListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState(''); // for real-time speech text

  // Text command submit
  const handleTestSubmit = async () => {
    setResult('Processing...');
    try {
      const res = await fetch('http://127.0.0.1:5000/test-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commandText }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(`Result: ${data.result}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setResult('Error connecting to backend');
    }
  };

  // Voice command using Web Speech API (browser)
  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = true; // Enable real-time interim results!
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setResult('Listening...');
      setLiveTranscript(''); // clear previous live transcript
    };

    recognition.onerror = (event) => {
      setListening(false);
      setResult(`Error: ${event.error}`);
    };

    recognition.onresult = async (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setLiveTranscript(interimTranscript);

      if (finalTranscript) {
        setListening(false);
        setLiveTranscript('');
        setCommandText(finalTranscript);
        setResult(`You said: "${finalTranscript}". Processing...`);

        try {
          const res = await fetch('http://127.0.0.1:5000/command', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: finalTranscript }),
          });

          const data = await res.json();
          if (res.ok) {
            setResult(`Result: ${data.result}`);
          } else {
            setResult(`Error: ${data.error}`);
          }
        } catch (error) {
          setResult('Error connecting to backend');
        }
      }
    };

    recognition.start();
  };

return (
  <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 bg-gradient-to-br from-indigo-950 to-purple-900 text-white relative overflow-hidden">
    {/* Animated grid background */}
    <div className="absolute inset-0 z-0 opacity-10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0D0iMTAwJSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-grid-line"></div>
    </div>

    {/* Main content container */}
    <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
      {/* Animated header section */}
      <div className="flex flex-col items-center mb-12 space-y-6">
        <div className="float-animation relative">
          <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
          <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m2 2H7m4 4h-2m4 0h-2m4 4h-2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent relative">
          Voice Calculator
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-blue-400/50 to-purple-300/50 rounded-full"></div>
        </h1>
      </div>

      {/* Dual panel layout for desktop */}
      <div className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Text command panel */}
        <div className="glass-effect p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300 hover:shadow-2xl hover:translate-y-1">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-semibold text-purple-300">Text Input</h2>
            <input
              type="text"
              placeholder="Type a command like 5 + 3"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              className="p-4 text-lg bg-white/10 backdrop-blur-sm rounded-xl w-full text-center focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
            <button
              onClick={handleTestSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all hover:gap-3 hover:scale-105 w-full justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Text Command
            </button>
          </div>
        </div>

        {/* Voice command panel */}
        <div className="glass-effect p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300 hover:shadow-2xl hover:translate-y-1">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-semibold text-green-300">Voice Input</h2>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleVoiceCommand}
                disabled={listening}
                className={`relative p-8 rounded-full transition-all ${
                  listening 
                    ? 'bg-red-500 pulse-animation' 
                    : 'bg-green-500 hover:bg-green-600 hover:scale-105'
                }`}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                {listening && (
                  <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping" />
                )}
              </button>

              {listening && liveTranscript && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg backdrop-blur-sm w-full text-center">
                  <p className="text-purple-200 italic animate-pulse">
                    🎤 Listening: {liveTranscript}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Result display */}
      {result && (
        <div className="glass-effect mt-12 p-8 rounded-2xl max-w-2xl w-full text-center space-y-4 animate-fade-in">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">Calculation Result</h3>
          <p className="text-3xl font-mono bg-white/10 p-6 rounded-xl backdrop-blur-sm flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {result}
          </p>
        </div>
      )}
    </div>

    {/* Enhanced background elements */}
    <div className="fixed -bottom-48 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-spin-slow" />
    <div className="fixed -top-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-spin-slow delay-300" />
    <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-float" />
    
    {/* Floating particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }} />
      ))}
    </div>
  </main>
);
}
