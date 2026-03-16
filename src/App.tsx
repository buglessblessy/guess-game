import React, { useState, useEffect } from "react";

type Question = {
  image: string;
  clue: string;
  answer: string;
};

const questions: Question[] = [
  { image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "Animal that chases mouse", answer: "cat" },
  { image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "Baby of dog", answer: "puppy" },
  { image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "Drink from it", answer: "milk" },
  { image: "https://images.pexels.com/photos/1405930/pexels-photo-1405930.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "What it lays", answer: "egg" },
  { image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "Opposite of day", answer: "night" },
  { image: "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=600", clue: "Where it lives", answer: "water" }
];

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  
  const progress = ((index + 1) / questions.length) * 100;

  useEffect(() => {
    if (!isFinished) setLoading(true);
  }, [index, isFinished]);

  const checkAnswer = () => {
    if (isFinished || !input.trim()) return;
    
    if (input.trim().toLowerCase() === questions[index].answer.toLowerCase()) {
      setScore((prev) => prev + 1);
      setMessage("✅ Amazing!");
      setTimeout(handleNextLogic, 1000);
    } else {
      setMessage("❌ Try again!");
    }
  };

  const handleNextLogic = () => {
    setMessage("");
    setInput("");
    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartGame = () => {
    setIndex(0);
    setScore(0);
    setInput("");
    setMessage("");
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-10 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center animate-in fade-in zoom-in duration-300">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
            <span className="text-4xl">🏆</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Well Done!</h2>
          <p className="text-slate-500 mb-8 font-medium">Quest Completed</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Score</p>
              <p className="text-3xl font-black text-indigo-600">{score}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-slate-400">Accuracy</p>
              <p className="text-3xl font-black text-emerald-500">{Math.round((score/questions.length)*100)}%</p>
            </div>
          </div>

          <button onClick={restartGame} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-200">
            RESTART GAME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-4 md:p-10 font-sans selection:bg-indigo-100">
      
      {/* --- GAME HEADER --- */}
      <header className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          PIX-QUEST
        </h1>
        <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-2xl">
          <div className="flex-1 bg-slate-700 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-black text-indigo-300 min-w-[3rem]">
            {index + 1} / {questions.length}
          </span>
        </div>
      </header>

      {/* --- MAIN GAME CARD --- */}
      <main className="bg-white text-slate-900 rounded-[2.5rem] p-6 md:p-8 w-full max-w-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all">
        
        {/* Image Frame */}
        <div className="relative w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-8 shadow-inner border-[6px] border-slate-50">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            key={questions[index].image}
            src={questions[index].image}
            alt="Game Clue"
            onLoad={() => setLoading(false)}
            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
          <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Clue Inside
          </div>
        </div>

        {/* Clue Text */}
        <div className="text-center mb-8">
          <p className="text-[10px] text-indigo-400 uppercase tracking-[0.3em] font-black mb-2">The Hint</p>
          <h2 className="text-2xl font-black text-slate-800 leading-tight">
            "{questions[index].clue}"
          </h2>
        </div>

        {/* Input Group */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="What is it?"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-center text-xl font-bold focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <button 
            onClick={checkAnswer} 
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.97] transition-all text-lg tracking-wide uppercase"
          >
            Submit Answer
          </button>
        </div>

        {/* Message area */}
        <div className="h-14 flex items-center justify-center mt-2">
          {message && (
            <div className={`px-4 py-1 rounded-full text-sm font-bold animate-bounce ${message.includes("✅") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
              {message}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Score</span>
            <span className="text-xl font-black text-indigo-600">{score}</span>
          </div>
          <button 
            onClick={handleNextLogic} 
            className="group flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-600 transition-colors text-xs uppercase tracking-widest"
          >
            Skip <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </main>

      <footer className="mt-8 text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">
        Use ENTER to submit • Optimized for Desktop & Mobile
      </footer>
    </div>
  );
};

export default App;