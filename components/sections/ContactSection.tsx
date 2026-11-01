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
  Phone,
  MapPin,
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
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

        try {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.8 },
            colors: ["#3B82F6", "#60A5FA", "#10B981"],
          });
        } catch (cErr) {
          // Confetti silent fallback
        }
      } else if (result.requiresConfiguration) {
        setSubmitStatus("config_notice");
        setStatusMessage(
          result.error ||
            `Direct email is available below: ${personalInfo.email}`
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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
            Direct Communication &amp; Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            Get in Touch with Samir Khan
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Currently in 3rd Year B.Tech CSE at SIET Prayagraj. Open to software engineering internships and technical roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-100 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white light:text-slate-900">
                Contact Coordinates
              </h3>
              <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed font-sans">
                Feel free to reach out directly via email, phone, or LinkedIn for technical internships, project collaborations, or engineering discussions.
              </p>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-surface-200/60 border border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-mono text-sm text-blue-400 hover:underline truncate"
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

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-surface-200/60 border border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Phone Number
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={personalInfo.social.phone}
                    className="font-mono text-sm text-emerald-400 hover:underline truncate"
                  >
                    {personalInfo.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-surface-100 hover:bg-surface-300 border border-white/10 text-slate-300 hover:text-white transition-all shrink-0"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white">Location &amp; Institution</p>
                  <p className="text-slate-400 mt-0.5">
                    {personalInfo.location} • {personalInfo.college}
                  </p>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 border border-white/5 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-all hover:border-blue-400/40 hover:text-white"
                >
                  <Github className="w-4 h-4 text-blue-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 border border-white/5 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-all hover:border-blue-400/40 hover:text-white"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-white/10 space-y-5 shadow-xl relative"
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
                    Your Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Technical Recruiter / Engineering Manager"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.name
                        ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                    Your Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="recruiter@company.com"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.email
                        ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  Subject <span className="text-blue-400">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Software Engineering Internship / Full-Stack Role Inquiry"
                  className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.subject
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  Message <span className="text-blue-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Samir, we reviewed your projects and background and would love to interview you for an engineering internship..."
                  className={`w-full px-4 py-2.5 text-sm rounded-xl bg-surface-200 border text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-blue-400">
                      Direct Email Routing
                    </span>
                    <span>{statusMessage}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="mt-2 text-white underline block"
                    >
                      Click to copy: {personalInfo.email}
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
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Samir</span>
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
