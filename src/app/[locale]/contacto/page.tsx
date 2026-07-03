"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";

import { Button } from "@/components/ui/button";

import {
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { useContact } from "@/hooks/useContact";

export default function ContactoPage() {
  const t = useTranslations("contactPage");

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { sendContactForm, isLoading } = useContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const response = await sendContactForm({
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      mensaje: formData.mensaje,
    });

    if (response.success) {
      setSuccessMessage(t("messages.success"));

      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        mensaje: "",
      });
    } else {
      setErrorMessage(
        response.error || t("messages.error")
      );
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a]">
      <Header />

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Contact */}
      <section className="relative overflow-hidden px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[-140px] top-[-120px] h-[380px] w-[380px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

          <div className="absolute bottom-[-140px] right-[-120px] h-[380px] w-[380px] rounded-full bg-violet-700/20 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.16) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.16) 1px, transparent 1px)
              `,
              backgroundSize: "74px 74px",
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full opacity-35"
            viewBox="0 0 1600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="contactLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 240 H260 L340 160 H620"
              stroke="url(#contactLine)"
              strokeWidth="2"
            />

            <path
              d="M980 340 H1220 L1320 240 H1600"
              stroke="url(#contactLine)"
              strokeWidth="2"
            />

            {[340, 1320].map((x, i) => (
              <polygon
                key={i}
                points={`
                  ${x},142
                  ${x + 16},151
                  ${x + 16},169
                  ${x},178
                  ${x - 16},169
                  ${x - 16},151
                `}
                stroke="#d946ef"
                strokeWidth="1.5"
                fill="rgba(168,85,247,0.08)"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info Panel */}
            <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/10 bg-[linear-gradient(180deg,rgba(25,16,40,0.96)_0%,rgba(8,8,14,0.98)_100%)] p-8 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                  {t("info.badge")}
                </span>
              </div>

              <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                {t("info.title")}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-400">
                {t("info.description")}
              </p>
            </div>

            {/* Form */}
            <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/10 bg-[linear-gradient(180deg,rgba(16,16,24,0.98)_0%,rgba(8,8,14,0.98)_100%)] p-8 md:p-10 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      placeholder={t("form.name")}
                      value={formData.nombre}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.04] focus:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="telefono"
                      placeholder={t("form.phone")}
                      value={formData.telefono}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.04] focus:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.04] focus:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="mensaje"
                    placeholder={t("form.message")}
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.04] focus:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-sm font-medium text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />

                    <span>{successMessage}</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm font-medium text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="group h-14 min-w-[220px] rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.28)] disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("form.sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t("form.submit")}

                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </main>
  );
}