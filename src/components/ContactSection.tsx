"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Send, Loader2, ArrowUpRight, CheckCircle, XCircle, X } from "lucide-react";

// ── Inline Toast ──────────────────────────────────────────────────────────────

type ToastType = "success" | "error";

function Toast({ show, type, message, onClose }: { show: boolean; type: ToastType; message: string; onClose: () => void }) {
  if (!show) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${type === "success" ? "bg-[#0a0a0a] text-white" : "bg-red-600 text-white"}`}>
      {type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

interface FormState { name: string; email: string; subject: string; message: string; }
const INIT: FormState = { name: "", email: "", subject: "", message: "" };

const contactCards = [
  { icon: MessageCircle, label: "WhatsApp",  value: "+62 812-3456-7890", href: "https://wa.me/6281234567890",       hint: "Chat directly"        },
  //{ icon: InstagramIcon, label: "Instagram", value: "@rayfilm_",         href: "https://instagram.com/rayfilm_",   hint: "See our latest work"  },
  { icon: Mail,          label: "Email",     value: "rayfilm.work@gmail.com",  href: "mailto:rayfilm.work@gmail.com",           hint: "Send us a message"    },
];

export default function ContactSection() {
  const [form, setForm]     = useState<FormState>(INIT);
  const [loading, setLoad]  = useState(false);
  const [toast, setToast]   = useState<{ show: boolean; type: ToastType; message: string }>({ show: false, type: "success", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setToast({ show: true, type: "error", message: "Please fill in all fields." });
      return;
    }

    setLoad(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json() as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setForm(INIT);
      setToast({ show: true, type: "success", message: "Message sent successfully." });
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message.",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-28 bg-[#f8f8f8] border-t border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9a9a9a] mb-3"
            >
              Let&apos;s Connect
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] leading-tight mb-4"
            >
              Contact Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-[#6b6b6b] text-base max-w-md"
            >
              Ready to create something extraordinary? Reach out — we&apos;d love to hear about your project.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Contact cards */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {contactCards.map(({ icon: Icon, label, value, href, hint }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-[#e8e8e8] bg-white hover:border-[#c8c8c8] hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f2f2f2] border border-[#e4e4e4] flex items-center justify-center text-[#6b6b6b] group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-all flex-shrink-0">
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a]">{label}</p>
                    <p className="text-sm font-semibold text-[#0a0a0a] mt-0.5 truncate">{value}</p>
                    <p className="text-xs text-[#b0b0b0] mt-0.5">{hint}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-[#c8c8c8] group-hover:text-[#0a0a0a] flex-shrink-0 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
              className="lg:col-span-3"
            >
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {["name", "email"].map((field) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label htmlFor={field} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">
                        {field === "name" ? "Name" : "Email"}
                      </label>
                      <input
                        id={field} name={field} type={field === "email" ? "email" : "text"}
                        value={form[field as keyof FormState]} onChange={onChange}
                        placeholder={field === "name" ? "Your full name" : "your@email.com"} required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#e4e4e4] text-[#0a0a0a] text-sm placeholder-[#c8c8c8] focus:outline-none focus:border-[#9a9a9a] focus:ring-0 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">Subject</label>
                  <input
                    id="subject" name="subject" type="text" value={form.subject} onChange={onChange}
                    placeholder="What&apos;s this about?" required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e4e4e4] text-[#0a0a0a] text-sm placeholder-[#c8c8c8] focus:outline-none focus:border-[#9a9a9a] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">Message</label>
                  <textarea
                    id="message" name="message" rows={5} value={form.message} onChange={onChange}
                    placeholder="Tell us about your project..." required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e4e4e4] text-[#0a0a0a] text-sm placeholder-[#c8c8c8] focus:outline-none focus:border-[#9a9a9a] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0a0a0a] text-white text-sm font-semibold hover:bg-[#2e2e2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, show: false }))} />
    </>
  );
}
