"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="py-8 bg-background flex-grow">
      
      {/* Header */}
      <div className="bg-[#F5F3EF]/50 py-12 border-b border-border text-center mb-16">
        <div className="container max-w-xl space-y-4">
          <Badge variant="indigo" size="sm">Get in Touch</Badge>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">Contact LoomLedger Support</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Need help verifying a product passport? Want to register your weaving cooperative? Send us a message.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-border rounded-lg p-6 space-y-6 shadow-sm">
            <h3 className="font-serif font-semibold text-lg text-foreground border-b border-border pb-3">Support Hubs</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">Email Support</span>
                  <span className="text-xs">support@loomledger.org</span>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">Helpline Phone</span>
                  <span className="text-xs">+91 11-4099-2345 (10am - 6pm IST)</span>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">Varanasi Desk office</span>
                  <span className="text-xs">C-12, Kabir Chaura Handloom Center, Varanasi, UP, 221001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white border border-border rounded-lg p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-success-light text-success flex items-center justify-center mx-auto shadow-sm">
                <Check size={24} />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Message Transmitted</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                We will analyze your ticket and reply within 24 hours. Thanks for contacting us.
              </p>
              <button onClick={() => setSubmitted(false)} className="px-4 py-2 border border-border rounded text-xs">
                Send Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ramesh"
                    className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. client@mail.com"
                    className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Message details</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your inquiry here..."
                  className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm flex items-center justify-center gap-2 shadow"
              >
                <Send size={16} />
                <span>Send Support Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
