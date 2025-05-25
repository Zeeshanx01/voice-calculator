export default function TextInput({ commandText, setCommandText, onSubmit }) {
  return (
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
          onClick={onSubmit}
          className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all hover:gap-3 hover:scale-105 w-full justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Submit Text Command
        </button>
      </div>
    </div>
  );
}