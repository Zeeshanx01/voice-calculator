'use client';
import { useEffect } from 'react';

export default function VoiceInput({ onFinalTranscript, listening, setListening, liveTranscript, setLiveTranscript }) {
  useEffect(() => {
    if (!listening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setLiveTranscript('');
    };

    recognition.onerror = (event) => {
      setListening(false);
      onFinalTranscript(`Error: ${event.error}`);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        event.results[i].isFinal ? final += transcript : interim += transcript;
      }

      setLiveTranscript(interim);
      if (final) {
        recognition.stop();
        setListening(false);
        onFinalTranscript(final);
      }
    };

    recognition.start();
    return () => recognition.abort();
  }, [listening, onFinalTranscript, setListening, setLiveTranscript]);

  return (
    <div className="glass-effect p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300 hover:shadow-2xl hover:translate-y-1">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-green-300">Voice Input</h2>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setListening(true)}
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
  );
}