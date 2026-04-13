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
              {/* About */}
              <div className="mt-6 text-sm leading-relaxed space-y-4">

                  <p>
                  I'm a Senior Software Engineer turned AI Engineer with over 10 years of 
                  experience building scalable enterprise platforms across fintech, banking, 
                  and cloud systems.
                  </p>

                  <p>
                  Recently, I completed intensive AI Engineering training through Andela, 
                  alongside advanced programs in:
                  </p>

                  <ul className="list-disc list-inside space-y-1 opacity-80">
                  <li>LLM Engineering</li>
                  <li>Agentic AI Systems</li>
                  <li>RAG Architecture</li>
                  <li>Production AI Deployment</li>
                  <li>MCP & Tool-calling agents</li>
                  <li>AI Infrastructure & Observability</li>
                  </ul>

                  <p>
                  I now specialize in building production-ready AI systems, including:
                  </p>

                  <ul className="list-disc list-inside space-y-1 opacity-80">
                  <li>Multi-agent AI systems</li>
                  <li>RAG pipelines</li>
                  <li>AI copilots</li>
                  <li>AI automation systems</li>
                  <li>Enterprise LLM integrations</li>
                  <li>AI microservices</li>
                  </ul>

                  <p>
                  My background in Full-Stack Engineering, DevOps, and Fintech systems allows 
                  me to build AI systems that actually ship to production — not just prototypes.
                  </p>
              </div>   

           {/* Skills */}
            <div className="mt-8 space-y-6">

            {/* AI Engineering */}
            <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-3">
            AI Engineering
            </h3>

            <div className="flex flex-wrap gap-2">
            {[
            "LLM Engineering",
            "Agentic AI",
            "RAG",
            "LangChain",
            "Multi-Agent Systems",
            "AI Copilots"
            ].map((skill) => (
            <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white/60 backdrop-blur"
            >
            {skill}
            </span>
            ))}
            </div>
            </div>

            {/* Backend */}
            <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-3">
            Backend Engineering
            </h3>

            <div className="flex flex-wrap gap-2">
            {[
            "Python",
            "FastAPI",
            "Spring Boot",
            "Microservices",
            "REST APIs"
            ].map((skill) => (
            <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white/60 backdrop-blur"
            >
            {skill}
            </span>
            ))}
            </div>
            </div>

            {/* Infrastructure */}
            <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-3">
            Infrastructure
            </h3>

            <div className="flex flex-wrap gap-2">
            {[
            "AWS",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "Observability"
            ].map((skill) => (
            <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white/60 backdrop-blur"
            >
            {skill}
            </span>
            ))}
            </div>
            </div>

            </div>
            {/* End Skills */}
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