"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { API_BASE } from '@/context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! 🙏 I am your LoomLedger AI Assistant. Ask me anything about Indian handlooms, registering as a weaver, or verifying GI textile passports!",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    const userMsgId = Math.random().toString(36).substring(7);
    const userMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/assistant/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: textToSend })
      });

      const json = await response.json();
      const botMsgId = Math.random().toString(36).substring(7);
      
      if (response.ok && json.answer) {
        setMessages(prev => [...prev, {
          id: botMsgId,
          sender: 'bot',
          text: json.answer,
          timestamp: new Date()
        }]);
      } else {
        throw new Error(json.error || 'Failed to get answer from assistant');
      }
    } catch (err: any) {
      console.error('Chat Assistant Error:', err);
      setError('Connection issue. Please try again.');
      
      // Add error fallback message
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: "I'm having trouble connecting to the knowledge base right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const suggestionChips = [
    "How do I register as a weaver?",
    "What is a Digital Product Passport?",
    "How do I check GI Certification?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white/95 backdrop-blur-md border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          {/* Header */}
          <div className="bg-[#2D3A5C] text-white p-4 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-1">
                  <span>LoomLedger Assistant</span>
                  <Sparkles size={12} className="text-accent animate-pulse" />
                </h3>
                <span className="text-[10px] text-success font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                  <span>Knowledge Base Online</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/85 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-secondary/10 flex flex-col">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground self-end rounded-tr-none shadow-sm'
                    : 'bg-white text-foreground border border-border/80 self-start rounded-tl-none shadow-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {loading && (
              <div className="bg-white border border-border/80 text-foreground self-start rounded-lg rounded-tl-none p-3 max-w-[85%] flex items-center gap-2 text-xs">
                <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-muted-foreground">LoomLedger Assistant is thinking...</span>
              </div>
            )}

            {error && (
              <div className="text-[10px] text-error flex items-center gap-1 justify-center self-stretch bg-error-light/30 py-1.5 rounded border border-error/10">
                <AlertCircle size={12} />
                <span>{error}</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2 bg-secondary/5 border-t border-border shrink-0 flex flex-col gap-1.5">
              <span className="text-[10px] text-muted-foreground font-semibold">Suggested Questions:</span>
              <div className="flex flex-wrap gap-1.5 pb-1">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="text-[10px] text-primary hover:text-primary-hover bg-primary-light hover:bg-primary-light/80 px-2.5 py-1 rounded-full text-left font-medium transition-colors border border-primary/10"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-border bg-white flex gap-2 items-center shrink-0">
            <input
              type="text"
              placeholder="Ask about weaver registry, GI tags..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              className="flex-grow bg-secondary/15 border border-border/60 rounded-md px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-primary text-foreground disabled:opacity-50"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-sm shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Toggler Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200"
        aria-label="Toggle AI assistant chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
