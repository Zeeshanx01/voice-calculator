export default function Result({ result }) {
  if (!result) return null;

  return (
    <div className="glass-effect mt-12 p-8 rounded-2xl max-w-2xl w-full text-center space-y-4 animate-fade-in">
      <h3 className="text-2xl font-semibold text-purple-300 mb-4">Calculation Result</h3>
      <p className="text-3xl font-mono bg-white/10 p-6 rounded-xl backdrop-blur-sm flex items-center justify-center gap-3">
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {result}
      </p>
    </div>
  );
}