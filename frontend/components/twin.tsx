'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [darkMode, setDarkMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // const response = await fetch('https://2z3nxhkz6h.execute-api.us-east-1.amazonaws.com/chat', {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickQuestions = [
        "What do you focus on as a full-stack engineer?",
        "How can we collaborate?",
        "What projects have you worked on?",
        "What's your experience with AI?",
        "Best way to contact you?"
      ];
      
      const handleQuickQuestion = (question: string) => {
        setInput(question);
      };

    return (
        // <div className="flex flex-col h-full bg-white border rounded-2xl shadow-xl overflow-hidden">
        <div className={`flex flex-col h-full border rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? "bg-slate-900 text-white" : "bg-white"
            }`}>
        
        {/* Premium Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        
        <div className="flex items-center gap-3">
        
        <div className="relative">
        <img
        src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
        className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        <div>
        <h2 className="font-semibold text-gray-900">
        Yaqub Digital Twin
        </h2>
        
        <p className="text-xs text-gray-500">
        AI Assistant • Online
        </p>
        </div>
        
        </div>
        
        </div>
        <div className="px-6 pt-4">

        <div className="flex flex-wrap gap-2">

        {quickQuestions.map((q) => (
        <button
        key={q}
        onClick={() => handleQuickQuestion(q)}
        className="text-sm px-3 py-1 rounded-full border hover:bg-gray-100 transition"
        >
        {q}
        </button>
        ))}

        </div>

        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        
        {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
        
        <img
        src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
        className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        
        <p className="font-medium text-gray-800">
        Hi — I'm Yaqub's Digital Twin
        </p>
        
        <p className="text-sm mt-2">
        Ask me anything about experience, projects, or collaboration
        </p>
        
        </div>
        )}
        
        {messages.map((message) => (
        <div
        key={message.id}
        className={`flex gap-3 ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
        }`}
        >
        
        {message.role === 'assistant' && (
        <div className="flex-shrink-0">
        <img
        src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
        className="w-8 h-8 rounded-full"
        />
        </div>
        )}
        
        <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
        message.role === 'user'
        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
        : 'bg-white border text-gray-800'
        }`}
        >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        <p
        className={`text-xs mt-2 ${
        message.role === 'user'
        ? 'text-slate-300'
        : 'text-gray-400'
        }`}
        >
        {message.timestamp.toLocaleTimeString()}
        </p>
        
        </div>
        
        {message.role === 'user' && (
        <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
        </div>
        </div>
        )}
        
        </div>
        ))}
        
        {isLoading && (
        <div className="flex gap-3 justify-start">
        
        <img
        src="https://res.cloudinary.com/dkkybtdxj/image/upload/v1775188902/profile_ljawhb.png"
        className="w-8 h-8 rounded-full"
        />
        
        <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
        </div>
        </div>
        
        </div>
        )}
        
        <div ref={messagesEndRef} />
        
        </div>
        
        {/* Premium Input */}
        <div className="border-t p-4 bg-white">
        
        <div className="flex gap-2">
        
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask Yaqub anything..."
        className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
        disabled={isLoading}
        />
        
        <button
        onClick={sendMessage}
        disabled={!input.trim() || isLoading}
        className="px-5 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:opacity-90 transition"
        >
        <Send className="w-5 h-5" />
        </button>
        
        </div>
        
        </div>
        
        </div>
    );
}