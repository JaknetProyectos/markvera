"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import WhyUs from "@/components/WhyUs";

import {
  Lightbulb,
  Award,
  Users,
  Heart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Image from "next/image";

import { useTranslations } from "next-intl";

import { getOptimizedUrl } from "@/lib/images";

// Map icon strings to components
const iconMap = {
  Lightbulb,
  Award,
  Users,
  Heart,
};

export default function NosotrosPage() {
  const t = useTranslations("aboutPage");
  const companyValues = t.raw("companyValues") as {
    icon: keyof typeof iconMap;
    title: string;
    description: string;
  }[];

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a]">
      <Header />

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* About */}
      <section className="relative overflow-hidden px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-fuchsia-600/20 blur-[120px]" />

          <div className="absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-violet-700/20 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.14) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.14) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* PCB lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 1600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="aboutLines"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 220 H340 L420 140 H760"
              stroke="url(#aboutLines)"
              strokeWidth="2"
            />

            <path
              d="M980 500 H1240 L1320 420 H1600"
              stroke="url(#aboutLines)"
              strokeWidth="2"
            />

            {[420, 1320].map((x, i) => (
              <polygon
                key={i}
                points={`
                  ${x},122
                  ${x + 14},130
                  ${x + 14},146
                  ${x},154
                  ${x - 14},146
                  ${x - 14},130
                `}
                stroke="#d946ef"
                strokeWidth="1.5"
                fill="rgba(168,85,247,0.08)"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-transparent blur-xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/15 bg-white/[0.03] p-2 backdrop-blur-xl">
                <Image
                  src={getOptimizedUrl(
                    "https://images.unsplash.com/photo-1574645434327-cb7970fe2e13?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("about.imageAlt")}
                  width={700}
                  height={500}
                  className="rounded-[1.5rem] object-cover"
                />

                <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-[#05050a]/30 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                  {t("about.badge")}
                </span>
              </div>

              <h2 className="mb-7 text-4xl font-black leading-tight text-white md:text-5xl">
                {t("about.title")}
              </h2>

              <p className="text-lg leading-relaxed text-slate-300">
                {t("about.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-fuchsia-400/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
                  <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                  {t("about.features.custom")}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-fuchsia-400/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-fuchsia-300" />
                  {t("about.features.performance")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden border-y border-white/5 px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,28,135,0.35),transparent_60%),#07070d]" />

        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-700/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-fuchsia-300" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                {t("values.badge")}
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
              {t("values.title")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value) => {
              const IconComponent =
                iconMap[value.icon as keyof typeof iconMap];

              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-fuchsia-400/10 bg-white/[0.03] p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-fuchsia-400/20 hover:bg-fuchsia-500/[0.05]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-400/15 bg-fuchsia-500/10 shadow-[0_0_30px_rgba(217,70,239,0.12)]">
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-fuchsia-300" />
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-black text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <WhyUs />

      <CtaSection />

      <Footer />
    </main>
  );
}