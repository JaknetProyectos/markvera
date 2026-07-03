"use client";

import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const distinguishingFeatures = t.raw(
    "distinguishingFeatures"
  ) as string[];

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#07070c] px-4 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Ambient glows */}
        <div className="absolute left-[-120px] top-[-140px] h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-violet-700/20 blur-3xl" />

        {/* PCB Grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black 45%, transparent 100%)",
          }}
        />

        {/* Circuit decoration */}
        <svg
          className="absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="whyLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <filter id="whyGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M0 160 H240 L320 90 H540"
            stroke="url(#whyLine)"
            strokeWidth="2"
            filter="url(#whyGlow)"
          />

          <path
            d="M960 240 H1180 L1260 160 H1520"
            stroke="url(#whyLine)"
            strokeWidth="2"
            filter="url(#whyGlow)"
          />

          <path
            d="M180 680 H420 L500 600 H760"
            stroke="url(#whyLine)"
            strokeWidth="2"
            filter="url(#whyGlow)"
          />

          {[320, 500, 1260].map((x, i) => (
            <polygon
              key={i}
              points={`
                ${x},72
                ${x + 16},81
                ${x + 16},99
                ${x},108
                ${x - 16},99
                ${x - 16},81
              `}
              stroke="#c084fc"
              strokeWidth="1.5"
              fill="rgba(168,85,247,0.08)"
              filter="url(#whyGlow)"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              {/* Glow */}
              <div className="absolute inset-0 scale-105 rounded-[2rem] bg-violet-600/20 blur-[70px]" />

              {/* Floating dots */}
              <div className="absolute -left-3 top-10 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_16px_#e879f9]" />
              <div className="absolute -right-2 top-1/4 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_#a855f7]" />
              <div className="absolute bottom-8 left-6 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_14px_#ec4899]" />

              {/* Frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.12)]">
                <div className="absolute inset-0 rounded-[2rem] border border-fuchsia-500/10" />

                <Image
                  src={getOptimizedUrl(
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("imageAlt")}
                  width={450}
                  height={550}
                  className="rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 text-white lg:order-2">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-fuchsia-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-[3.25rem]">
              {t("title")}
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
              {t("description")}
            </p>

            {/* Features */}
            <ul className="mt-10 space-y-4">
              {distinguishingFeatures.map((feature) => (
                <li
                  key={feature}
                  className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/20 hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <Check className="h-4 w-4 stroke-[3] text-white" />
                  </div>

                  <span className="text-base font-medium text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link href={"/nosotros"}>
                <Button className="group h-12 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}