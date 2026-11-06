import React, { useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Phone, Send, Copy, Check, ExternalLink, AlertCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject";
    if (!formData.message.trim()) {
      errs.message = "Please write your message";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#2F4BF0", "#F2B31B", "#12141B"],
      });
    } catch {
      // silent fallback
    }

    // Launch direct mailto with form parameters
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject + " - from " + formData.name
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setSubmitNotice(
      "Your default email client has been prepared with your message! You can send it directly or reach out at samir4khan555@gmail.com."
    );
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              07 &bull; Direct Connection
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              LET'S BUILD SOMETHING.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-base sm:text-lg max-w-xl font-medium">
              Have an interesting idea, an opportunity or just want to talk tech? My inbox is open.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Typical response: &lt; 24 hours
          </div>
        </div>

        {/* 2-Column Layout: Direct Details on Left, Functional Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2F4BF0]/10 text-[#2F4BF0] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm sm:text-base font-bold text-[#12141B] dark:text-[#EEF0F5] hover:text-[#2F4BF0] transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#2F4BF0] hover:text-white transition-all"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F2B31B]/15 text-[#F2B31B] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-sm sm:text-base font-bold text-[#12141B] dark:text-[#EEF0F5] hover:text-[#2F4BF0] transition-colors font-mono"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="p-2.5 rounded-xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#2F4BF0] hover:text-white transition-all"
                title="Copy phone to clipboard"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg hover:border-[#2F4BF0] hover:-translate-y-1 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Network</span>
                  <div className="font-bold text-sm text-[#12141B] dark:text-[#EEF0F5] group-hover:text-[#2F4BF0]">
                    LinkedIn
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#2F4BF0] transition-colors" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg hover:border-[#2F4BF0] hover:-translate-y-1 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Code Repos</span>
                  <div className="font-bold text-sm text-[#12141B] dark:text-[#EEF0F5] group-hover:text-[#2F4BF0]">
                    GitHub
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#2F4BF0] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-[#12141B] dark:text-[#EEF0F5] focus:outline-none focus:border-[#2F4BF0] transition-all"
                  />
                  {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-[#12141B] dark:text-[#EEF0F5] focus:outline-none focus:border-[#2F4BF0] transition-all"
                  />
                  {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Opportunity / Collaboration / Project Query"
                  className="w-full px-4 py-3 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-[#12141B] dark:text-[#EEF0F5] focus:outline-none focus:border-[#2F4BF0] transition-all"
                />
                {errors.subject && <span className="text-xs text-rose-500 mt-1 block">{errors.subject}</span>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your product, role or project idea..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-[#12141B] dark:text-[#EEF0F5] focus:outline-none focus:border-[#2F4BF0] transition-all resize-none"
                />
                {errors.message && <span className="text-xs text-rose-500 mt-1 block">{errors.message}</span>}
              </div>

              {submitNotice && (
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#2F4BF0] shrink-0 mt-0.5" />
                  <span>{submitNotice}</span>
                </div>
              )}

              {/* Prominent "Let's Talk" Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#2F4BF0] hover:bg-[#233bc7] text-white font-black text-sm tracking-widest uppercase transition-all shadow-xl shadow-[#2F4BF0]/30 hover:shadow-2xl hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Let's Talk</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
