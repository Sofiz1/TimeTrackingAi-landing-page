"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Search, 
  BarChart3, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  Menu, 
  X,
  Send
} from "lucide-react";

export default function LandingPage() {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => setDownloadCount(data.downloads))
      .catch(err => console.error("Failed to fetch stats", err));
  }, []);

  const handleDownload = async () => {
    // Immediate UI feedback for a responsive feel
    setDownloadCount(prev => (prev !== null ? prev + 1 : 1));
    
    try {
      await fetch("/api/track-download", { method: "POST" });
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.downloads !== undefined) {
        setDownloadCount(data.downloads);
      }
    } catch (err) {
      console.error("Failed to track download", err);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFeedback({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-emerald-500/30">
      {/* Background Atmosphere */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(16,185,129,0.1)_0%,transparent_70%)] z-[-1]" />
      
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt="TimeTrackingAI Logo" width={32} height={32} />
          <span className="font-bold text-xl tracking-tight">TimeTrackingAI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-zinc-400 hover:text-emerald-400 transition-colors">Features</a>
          <a href="#security" className="text-zinc-400 hover:text-emerald-400 transition-colors">Security</a>
          <a href="#feedback" className="text-zinc-400 hover:text-emerald-400 transition-colors">Feedback</a>
          <a 
            href="/assets/TimeTrackingAI_v1.1.3.zip" 
            onClick={handleDownload}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition active:scale-95"
          >
            Download v1.1.3
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8 text-2xl font-bold"
        >
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#security" onClick={() => setIsMenuOpen(false)}>Security</a>
          <a href="#feedback" onClick={() => setIsMenuOpen(false)}>Feedback</a>
          <a 
            href="/assets/TimeTrackingAI_v1.1.3.zip" 
            onClick={() => { handleDownload(); setIsMenuOpen(false); }}
            className="bg-[#10b981] text-black px-8 py-4 rounded-xl font-bold"
          >
            Download v1.1.3
          </a>
        </motion.div>
      )}

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-[10%] max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-6 uppercase tracking-wider">
            Windows 11 Native
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] mb-6 tracking-tighter">
            The Future of <span className="bg-gradient-to-r from-emerald-500 to-emerald-200 bg-clip-text text-transparent italic">Productivity</span> is Intelligent.
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-[500px] mx-auto lg:mx-0 font-light leading-relaxed">
            TimeTrackingAI combines deep OS integration with next-gen Llama 4 Vision to give you real-time insights into how you work. 
          </p>
          
          {downloadCount !== null && (
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-emerald-400/80 text-sm font-medium">
              <Download size={16} />
              <span>Joined by {downloadCount.toLocaleString()} productive users</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="/assets/TimeTrackingAI_v1.1.3.zip" onClick={handleDownload} className="px-9 py-4 bg-[#10b981] text-black no-underline rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-1 hover:bg-[#34d399] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2">
              <Download size={20} />
              Download for Windows
            </a>
            <a href="#features" className="px-9 py-4 bg-white/5 border border-white/10 text-white no-underline rounded-xl font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex items-center justify-center">
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] animate-floating group-hover:scale-[1.02] transition-transform duration-700">
            <Image 
              src="/assets/hero.png" 
              alt="TimeTrackingAI Interface" 
              width={800} 
              height={500} 
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-32 px-[10%] bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Productivity Reimagined</h2>
          <p className="text-zinc-400 text-lg font-light">Every tool you need to master your time in one premium app.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div whileHover={{ y: -10 }} className="bg-[#141414]/60 border border-white/10 p-10 rounded-[24px] transition-all duration-500 hover:border-[#10b981] hover:bg-[#10b981]/5">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">AI Vision Analysis</h3>
            <p className="text-zinc-400 leading-relaxed">Advanced Llama 4 Vision analyzes your workflow and provides personalized tips based on your actual screen content.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-[#141414]/60 border border-white/10 p-10 rounded-[24px] transition-all duration-500 hover:border-[#10b981] hover:bg-[#10b981]/5">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Dynamic Insights</h3>
            <p className="text-zinc-400 leading-relaxed">Visualize your day with high-fidelity charts that update instantly as you switch between tasks and projects.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-[#141414]/60 border border-white/10 p-10 rounded-[24px] transition-all duration-500 hover:border-[#10b981] hover:bg-[#10b981]/5">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Bell size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Smart Focus</h3>
            <p className="text-zinc-400 leading-relaxed">Stay focused with native Windows notifications that nudge you toward your goals without being intrusive.</p>
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-[10%] max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-neutral-900/50 border border-white/5 rounded-[40px] aspect-square flex items-center justify-center relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <ShieldCheck size={200} className="text-emerald-500/20 group-hover:scale-110 group-hover:text-emerald-500/30 transition-all duration-700" />
          <div className="bg-emerald-500 rounded-full p-6 absolute shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <ShieldCheck size={60} className="text-black" />
          </div>
        </motion.div>

        <div>
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-6 tracking-wider">
            Privacy First
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-8 text-center lg:text-left">Your data stays <span className="text-emerald-500 italic">your data</span>.</h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed font-light text-center lg:text-left">
            We believe in absolute privacy. TimeTrackingAI uses a <strong>Bring Your Own Key (BYOK)</strong> model. Your Groq API keys are encrypted and stored locally.
          </p>
          <div className="space-y-4 max-w-md mx-auto lg:mx-0">
            {[
              "Local SQLite Database encryption",
              "Windows SecureStorage for API Keys",
              "Zero external data harvesting"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-32 px-[10%] bg-zinc-950/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-center md:text-left">We'd love to hear from you.</h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-8 text-center md:text-left">
              Help us shape the future of productivity. Share your feedback, report a bug, or request a feature. We read every message.
            </p>
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col items-center md:items-start">
              <span className="text-emerald-400 font-bold block mb-1">Direct support</span>
              <p className="text-sm text-zinc-500 italic text-center md:text-left">"Designed with passion for precision." – Sofonias Hagos</p>
            </div>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition"
                value={feedback.name}
                onChange={e => setFeedback({...feedback, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition"
                value={feedback.email}
                onChange={e => setFeedback({...feedback, email: e.target.value})}
              />
            </div>
            <textarea 
              placeholder="Your message..."
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition resize-none"
              value={feedback.message}
              onChange={e => setFeedback({...feedback, message: e.target.value})}
            />
            <button 
              disabled={isSubmitting}
              className="w-full bg-[#10b981] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#34d399] transition disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <Send size={18} />
                  Send Feedback
                </>
              )}
            </button>
            {submitStatus === "success" && (
              <p className="text-emerald-500 text-sm font-medium animate-pulse text-center">Feedback sent successfully! Thank you.</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-400 text-sm font-medium text-center">Failed to send feedback. Please try again.</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-[10%] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-zinc-300">
          <Image src="/assets/logo.png" alt="Logo" width={24} height={24} />
          <span>TimeTrackingAI</span>
        </div>
        <p className="text-zinc-500 text-sm">&copy; 2026 TimeTrackingAI. Designed by Sofonias Hagos.</p>
      </footer>
    </div>
  );
}
