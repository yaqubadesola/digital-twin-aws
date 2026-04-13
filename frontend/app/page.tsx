'use client';

import { useEffect, useState } from 'react';
import Twin from '@/components/twin';

export default function Home() {

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("dark-mode");
if (saved === "true") setDarkMode(true);
}, []);

useEffect(() => {
localStorage.setItem("dark-mode", darkMode.toString());
}, [darkMode]);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      darkMode
      ? "bg-slate-900 text-white"
      : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
    }`}>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div className="text-center w-full">
            <h1 className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Yaqub's Digital Twin
            </h1>

            <p className={`mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              AI representation of Yaqub Raheem • Senior Full-Stack Engineer
            </p>
          </div>

          {/* Dark Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute right-8 px-4 py-2 rounded-xl border transition ${
              darkMode
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`backdrop-blur-xl border rounded-2xl shadow-lg p-6 transition ${
              darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white/70 border-gray-200"
            }`}>

              <div className="flex flex-col items-center text-center">

                <div className="relative">
                  <img
                    src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
                    className="w-36 h-36 rounded-full object-cover shadow-lg"
                  />

                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  Yaqub Raheem
                </h2>

                <p className="text-sm opacity-70">
                  Senior Full-Stack Engineer
                </p>

                <p className="text-sm opacity-60">
                  Lagos, Nigeria
                </p>

              </div>

              <div className="mt-6 text-sm leading-relaxed opacity-80">
                I'm Yaqub's Digital Twin. Ask me about experience,
                projects, hiring, or collaboration.
              </div>

              {/* Quick Questions */}
              <div className="mt-6 space-y-2">

                {[
                  "What do you focus on?",
                  "How can we collaborate?",
                  "What's your experience?",
                  "Best way to contact you?"
                ].map((q) => (

                  <button
                    key={q}
                    className={`w-full text-left p-3 rounded-lg transition text-sm ${
                      darkMode
                      ? "bg-slate-700 hover:bg-slate-600"
                      : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {q}
                  </button>

                ))}

              </div>

            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 h-[720px]">
            <Twin />
          </div>

        </div>

      </div>
    </main>
  );
}