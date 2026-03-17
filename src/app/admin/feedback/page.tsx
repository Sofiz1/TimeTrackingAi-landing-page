"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, User, Clock, Shield } from "lucide-react";

interface FeedbackItem {
  id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "timetrackingai-admin") {
      setAuthorized(true);
      fetchFeedback();
    } else {
      alert("Wrong password!");
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await fetch("/api/admin/feedback?token=timetrackingai-admin");
      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0A0B10] flex items-center justify-center p-4 selection:bg-blue-500/30">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-xl"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h1>
            <p className="text-zinc-400 text-center text-sm mb-8">Enter the administrative password to view feedback.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                Enter Dashboard
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Feedback Dashboard</h1>
            <p className="text-zinc-400">View and respond to user messages from TimeTrackingAI.</p>
          </div>
          <div className="px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
             <span className="text-sm font-medium">Database Connected</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/50 rounded-3xl border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : feedback.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
            <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400">No feedback yet</h3>
            <p className="text-zinc-500 max-w-xs mx-auto mt-2 text-sm italic">
              When users submit messages through the landing page, they'll appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 p-6 rounded-3xl backdrop-blur-xl transition-all hover:bg-zinc-900/80"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-500">
                    <User className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  </div>

                  <div className="relative pt-4 border-t border-white/5 mt-4">
                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-4">
                      "{item.message}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
