'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TwinProps {
  darkMode?: boolean;
  onClose?: () => void;
}

const QUICK_QUESTIONS = [
  'What do you focus on as a full-stack engineer?',
  'How can we collaborate?',
  'What projects have you worked on?',
  "What's your experience with AI?",
  'Best way to contact you?',
];

export default function Twin({ darkMode = false, onClose }: TwinProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dm = darkMode;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input;
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, session_id: sessionId || undefined }),
        }
      );

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      if (!sessionId) setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden ${dm ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b flex-shrink-0 ${dm ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
              className="w-9 h-9 rounded-full object-cover"
              alt="Yaqub Digital Twin"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">Yaqub&apos;s Digital Twin</p>
            <p className={`text-xs leading-tight ${dm ? 'text-gray-400' : 'text-gray-500'}`}>AI Assistant • Online</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition ${dm ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick questions */}
      {messages.length === 0 && (
        <div className={`px-4 pt-3 pb-2 flex-shrink-0 border-b ${dm ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${dm ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${dm ? 'bg-gray-950' : 'bg-gray-50'}`}>
        {messages.length === 0 && (
          <div className="text-center mt-8">
            <img
              src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
              className="w-14 h-14 rounded-full mx-auto mb-3 shadow-md"
              alt="Yaqub"
            />
            <p className={`font-semibold text-sm ${dm ? 'text-gray-200' : 'text-gray-800'}`}>
              Hi — I&apos;m Yaqub&apos;s Digital Twin
            </p>
            <p className={`text-xs mt-1.5 ${dm ? 'text-gray-500' : 'text-gray-500'}`}>
              Ask me anything about experience, projects, or collaboration
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <img
                src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
                className="w-7 h-7 rounded-full flex-shrink-0 mt-1"
                alt="Twin"
              />
            )}

            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-br-sm'
                  : dm
                  ? 'bg-gray-800 text-gray-100 rounded-bl-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className={`text-[10px] mt-1.5 ${message.role === 'user' ? 'text-violet-300' : dm ? 'text-gray-500' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-violet-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <img
              src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
              className="w-7 h-7 rounded-full flex-shrink-0 mt-1"
              alt="Twin"
            />
            <div className={`rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm ${dm ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <div className="flex space-x-1.5">
                <div className={`w-2 h-2 rounded-full animate-bounce ${dm ? 'bg-gray-500' : 'bg-gray-400'}`} />
                <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${dm ? 'bg-gray-500' : 'bg-gray-400'}`} />
                <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${dm ? 'bg-gray-500' : 'bg-gray-400'}`} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`border-t p-3 flex-shrink-0 ${dm ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Yaqub anything…"
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition ${dm ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
