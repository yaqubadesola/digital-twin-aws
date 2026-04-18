'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X, Moon, Sun, Mail, GitFork, ExternalLink, MapPin, Zap } from 'lucide-react';
import Twin from '@/components/twin';

const SKILLS: Record<string, string[]> = {
  'AI Engineering': ['LLM Engineering', 'Agentic AI', 'RAG', 'LangChain', 'LangGraph', 'CrewAI', 'Multi-Agent Systems', 'AI Copilots', 'Prompt Engineering', 'OpenAI API', 'Vector Databases', 'Gradio', 'Hugging Face'],
  'Backend Engineering': ['Python', 'FastAPI', 'Spring Boot', 'Java', 'Node.js (NestJS)', 'PHP (Laravel)', 'Microservices', 'REST APIs', 'GraphQL'],
  'Infrastructure': ['AWS Lambda', 'AWS API Gateway', 'S3', 'CloudFront', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Redux', 'Zustand'],
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    if (saved !== null) setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const dm = darkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${dm ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>

      {/* ── Navbar ────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors ${dm ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-extrabold text-xl bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            YAQUB
          </span>
          <div className="flex items-center gap-6">
            <a href="#about" className={`text-sm transition hover:opacity-100 ${dm ? 'opacity-60' : 'opacity-70'}`}>About</a>
            <a href="#skills" className={`text-sm transition hover:opacity-100 ${dm ? 'opacity-60' : 'opacity-70'}`}>Skills</a>
            <a href="#contact" className={`text-sm transition hover:opacity-100 ${dm ? 'opacity-60' : 'opacity-70'}`}>Contact</a>
            <button
              onClick={() => setDarkMode(!dm)}
              className={`p-2 rounded-lg transition ${dm ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Toggle theme"
            >
              {dm ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        {/* blobs */}
        <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* avatar */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 blur-xl opacity-50 scale-110" />
            <div className="relative p-[3px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400">
              <img
                src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
                className="w-32 h-32 rounded-full object-cover"
                alt="Yaqub Raheem"
              />
            </div>
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-gray-950 rounded-full" />
          </div>

          {/* badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 ${dm ? 'border-violet-500/30 bg-violet-500/10 text-violet-300' : 'border-violet-300 bg-violet-50 text-violet-700'}`}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-none">
            Yaqub Raheem
          </h1>

          <p className="text-xl md:text-2xl font-medium mb-6 text-violet-400 tracking-wide" style={{ fontStyle: 'italic', fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Senior Full-Stack &amp; AI Engineer
          </p>

          <p className={`text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
            10+ years building scalable enterprise platforms across fintech, banking, and cloud.
            Now shipping AI systems that go beyond prototypes — straight to production.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => { setChatOpen(true); setShowBubble(false); }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-violet-500/30 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with My Twin
            </button>
            <a
              href="#contact"
              className={`flex items-center gap-2 px-7 py-3.5 rounded-full border font-semibold text-sm transition ${dm ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>

          {/* socials */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              { icon: <GitFork className="w-5 h-5" />, href: 'https://github.com/' },
              { icon: <ExternalLink className="w-5 h-5" />, href: 'https://linkedin.com/' },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-full border transition ${dm ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-current" />
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className={`py-28 px-6 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <p className={`text-center text-sm font-semibold uppercase tracking-widest mb-4 ${dm ? 'text-violet-400' : 'text-violet-600'}`}>
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The engineer behind the&nbsp;
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              digital twin
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-3xl blur-2xl opacity-15" />
              <img
                src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
                className="relative w-full max-w-sm mx-auto rounded-3xl object-cover shadow-2xl"
                alt="Yaqub Raheem"
              />
            </div>

            <div className="space-y-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${dm ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' : 'bg-violet-50 text-violet-700 border-violet-200'}`}>
                <Zap className="w-3.5 h-3.5" />
                Senior Engineer → AI Engineer
              </div>

              <p className={`text-lg leading-relaxed ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                I&apos;m a Senior Software Engineer turned AI Engineer with over{' '}
                <strong className={dm ? 'text-white' : 'text-gray-900'}>10 years of experience</strong>{' '}
                building scalable enterprise platforms across fintech, banking, and cloud systems.
              </p>

              <p className={`text-lg leading-relaxed ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                My background in Full-Stack Engineering, DevOps, and Fintech systems lets me build AI
                systems that actually{' '}
                <strong className={dm ? 'text-white' : 'text-gray-900'}>ship to production</strong>{' '}
                — not just prototypes.
              </p>

              <div className={`flex items-center gap-2 text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria &bull; Open to Remote
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                {[['10+', 'Years exp.'], ['50+', 'Projects'], ['5+', 'AI systems']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{num}</p>
                    <p className={`text-sm mt-1 ${dm ? 'text-gray-500' : 'text-gray-500'}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className={`text-center text-sm font-semibold uppercase tracking-widest mb-4 ${dm ? 'text-violet-400' : 'text-violet-600'}`}>
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Technical{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              expertise
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div
                key={category}
                className={`p-8 rounded-2xl border transition-colors group ${dm ? 'bg-gray-900 border-gray-800 hover:border-violet-500/40' : 'bg-gray-50 border-gray-200 hover:border-violet-300'}`}
              >
                <h3 className={`font-semibold text-xs uppercase tracking-widest mb-5 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={`text-sm px-4 py-1.5 rounded-full border transition ${dm ? 'border-gray-700 bg-gray-800 hover:border-violet-500/50 hover:text-violet-300' : 'border-gray-200 bg-white hover:border-violet-300 hover:text-violet-700'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Twin CTA ──────────────────────────────────────────────── */}
      <section id="contact" className={`py-28 px-6 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-14 rounded-3xl border border-violet-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Meet My Digital Twin
              </h2>
              <p className={`mb-8 text-lg leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                Have questions about my experience, skills, or how we can collaborate?
                My AI-powered digital twin is ready to chat.
              </p>
              <button
                onClick={() => { setChatOpen(true); setShowBubble(false); }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-violet-500/25 text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className={`py-8 px-6 border-t text-sm ${dm ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Yaqub Raheem. All rights reserved.</p>
          <p>Built with Next.js &amp; deployed on AWS Lambda</p>
        </div>
      </footer>

      {/* ── Floating Chat Button ──────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {showBubble && !chatOpen && (
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl text-sm font-medium border max-w-[200px] cursor-pointer ${dm ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}
            onClick={() => { setChatOpen(true); setShowBubble(false); }}
          >
            👋 Chat with my digital twin!
          </div>
        )}
        <button
          onClick={() => { setChatOpen(!chatOpen); setShowBubble(false); }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-violet-500/40 hover:opacity-90 transition"
          aria-label={chatOpen ? 'Close chat' : 'Open chat'}
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Chat Panel ────────────────────────────────────────────── */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-full max-w-[400px] h-[560px] shadow-2xl rounded-2xl overflow-hidden">
          <Twin darkMode={dm} onClose={() => setChatOpen(false)} />
        </div>
      )}
    </div>
  );
}
