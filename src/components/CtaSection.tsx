"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CtaSection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="relative overflow-hidden bg-[#07070c] px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Ambient glow */}
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-violet-700/20 blur-3xl" />

        {/* PCB grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
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
          className="absolute inset-0 h-full w-full opacity-40"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ctaLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <filter id="ctaGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M0 180 H260 L340 110 H620"
            stroke="url(#ctaLine)"
            strokeWidth="2"
            filter="url(#ctaGlow)"
          />

          <path
            d="M960 240 H1180 L1260 160 H1520"
            stroke="url(#ctaLine)"
            strokeWidth="2"
            filter="url(#ctaGlow)"
          />

          {[340, 1260].map((x, i) => (
            <polygon
              key={i}
              points={`
                ${x},92
                ${x + 16},101
                ${x + 16},119
                ${x},128
                ${x - 16},119
                ${x - 16},101
              `}
              stroke="#c084fc"
              strokeWidth="1.5"
              fill="rgba(168,85,247,0.08)"
              filter="url(#ctaGlow)"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-80 min-h-[400px] lg:h-auto">
              {/* Glow */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-[#07070c]/20" />

              <Image
                src={getOptimizedUrl(
                  "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )}
                alt={t("imageAlt")}
                fill
                className="object-cover object-top"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070c]/50 via-transparent to-fuchsia-500/10" />

              {/* Floating dots */}
              <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_16px_#e879f9]" />
              <div className="absolute bottom-8 right-8 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_#a855f7]" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-10 lg:p-14">
              {/* Badge */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                  {t("badge")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-black leading-[1.15] text-white md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                {t("description")}
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link href={"/servicios"}>
                  <Button className="group h-12 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                    {t("button")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}