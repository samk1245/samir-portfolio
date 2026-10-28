"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { personalInfo } from "@/data/portfolio";
import { validateContactForm, ContactFormData } from "@/lib/validation/contact";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "config_notice">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side validation
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setStatusMessage(
          result.message || "Thank you! Your message has been sent successfully."
        );
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });

        // Celebration confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#00F0FF", "#3B82F6", "#8B5CF6"],
          });
        } catch (cErr) {
          // Ignore if confetti not supported
        }
      } else if (result.requiresConfiguration) {
        // Explicitly handle unconfigured email backend without false success!
        setSubmitStatus("config_notice");
        setStatusMessage(
          result.error ||
            "Email service requires RESEND_API_KEY in .env.local. Direct email is available below."
        );
      } else {
        setSubmitStatus("error");
        setStatusMessage(
          result.error || "An error occurred while dispatching the message."
        );
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        "Network connection error. Please verify your connection or email directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>06 // Communication Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            Let&apos;s Build Something Impactful
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Open to software engineering internships, technical collaborations, and full-time opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-100 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white light:text-slate-900">
                Direct Contact & Socials
              </h3>
              <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                Whether you have an engineering role to discuss or simply want to talk about systems architecture and AI, my inbox is open.
              </p>

              {/* Copy Email Box */}
              <div className="p-4 rounded-xl bg-surface-200/60 border border-white/5 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-mono text-sm text-cyan-400 hover:underline truncate"
                  >
                    {personalInfo.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-surface-100 hover:bg-surface-300 border border-white/10 text-slate-300 hover:text-white transition-all shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Availability Notice */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white">Current Response Time</p>
                  <p className="text-slate-400 mt-0.5">
                    Typically within 24 to 48 hours for engineering inquiries and interview requests.
                  </p>
                </div>
              </div>

              {/* Social Link Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 border border-white/5 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 border border-white/5 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Performance Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-white/10 space-y-5 shadow-2xl relative"
            >
              {/* Invisible Honeypot Spam Trap */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="form_honeypot">Leave blank</label>
                <input
                  id="form_honeypot"
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.name
                        ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.email
                        ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono text-slate-300 mb-1.5"
                >
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Software Engineering Internship / Full-Stack Role"
                  className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.subject
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-slate-300 mb-1.5"
                >
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message, project details, or interview inquiry here..."
                  className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Feedback Banner */}
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-emerald-400">
                      Message Dispatched
                    </span>
                    <span>{statusMessage}</span>
                  </div>
                </div>
              )}

              {submitStatus === "config_notice" && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-amber-400">
                      Environment Notice
                    </span>
                    <span>{statusMessage}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="mt-2 text-cyan-400 underline block"
                    >
                      Copy direct email: {personalInfo.email}
                    </button>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-rose-400">
                      Submission Failed
                    </span>
                    <span>{statusMessage}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
