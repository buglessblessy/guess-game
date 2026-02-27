import React, { useState, useEffect } from "react";

type Question = {
  image: string;
  clue: string;
  answer: string;
};

const questions: Question[] = [

  { 
    // Cat image for chasing mouse
    image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "Animal that chases mouse", 
    answer: "cat" 
  },
  { 
    // Puppy image
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "Baby of dog", 
    answer: "puppy" 
  },
  
  { 
    // Cow image for milk clue
    image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "Drink from it", 
    answer: "milk" 
  },
  { 
    // Hen image for egg clue
    image: "https://images.pexels.com/photos/1405930/pexels-photo-1405930.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "What it lays", 
    answer: "egg" 
  },

  { 
    // Sunrise image for night clue
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "Opposite of day", 
    answer: "night" 
  },
  { 
    // Underwater image for water clue
    image: "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=600", 
    clue: "Where it lives", 
    answer: "water" 
  }
];

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [index]);

  const current = questions[index];

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === current.answer.toLowerCase()) {
      setScore((prev) => prev + 1);
      setMessage("✅ Correct!");
      setTimeout(nextQuestion, 1200);
    } else {
      setMessage("❌ Try again!");
    }
  };

  const nextQuestion = () => {
    setMessage("");
    setInput("");
    setLoading(true);
    setIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white text-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-slate-400">Q {index + 1}/{questions.length}</span>
          <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold">Score: {score}</div>
        </div>

        <div className="relative w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border-2 border-slate-50">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            key={current.image}
            src={current.image}
            alt="clue"
            onLoad={() => setLoading(false)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Clue</p>
        <h2 className="text-center text-xl font-black mb-6">"{current.clue}"</h2>

        <div className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="Type answer..."
            className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-bold focus:border-indigo-500 focus:outline-none transition-all"
          />

          <button onClick={checkAnswer} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
            SUBMIT
          </button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {message && <p className={`text-xl font-bold ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
        </div>

        <button onClick={nextQuestion} className="w-full mt-2 py-2 text-slate-400 font-bold hover:text-indigo-600 transition-colors">
          SKIP QUESTION →
        </button>
      </div>
    </div>
  );
};

export default App;