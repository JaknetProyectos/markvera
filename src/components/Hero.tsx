"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#07070c] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_28%)]" />

        {/* PCB Hexagonal Grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
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

        {/* Hexagon circuit svg */}
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pcbLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Top left circuit */}
          <path
            d="M0 180 H220 L290 110 H520"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <path
            d="M520 110 L590 180 H760"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Center circuits */}
          <path
            d="M220 420 H420 L500 340 H760"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <path
            d="M760 340 L840 420 H1080"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Bottom circuits */}
          <path
            d="M120 720 H360 L430 650 H680"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <path
            d="M980 200 H1180 L1260 120 H1520"
            stroke="url(#pcbLine)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Hexagons */}
          {[
            [290, 110],
            [500, 340],
            [430, 650],
            [1260, 120],
            [840, 420],
          ].map(([x, y], i) => (
            <polygon
              key={i}
              points={`
                ${x},${y - 18}
                ${x + 16},${y - 9}
                ${x + 16},${y + 9}
                ${x},${y + 18}
                ${x - 16},${y + 9}
                ${x - 16},${y - 9}
              `}
              stroke="#c084fc"
              strokeWidth="1.5"
              fill="rgba(168,85,247,0.08)"
              filter="url(#glow)"
            />
          ))}

          {/* Nodes */}
          {[
            [220, 180],
            [760, 340],
            [1080, 420],
            [680, 650],
            [1180, 200],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#e879f9"
              filter="url(#glow)"
            />
          ))}
        </svg>

        {/* Ambient glows */}
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-violet-700/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Content */}
          <div>
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-fuchsia-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-2xl text-4xl font-black leading-[1] text-white md:text-5xl lg:text-[5rem]">
              {t("title.first")}
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
                {" "}
                {t("title.highlight")}{" "}
              </span>
              {t("title.last")}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              {t("description")}
            </p>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating glow dots */}
              <div className="absolute -left-5 top-10 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_18px_#e879f9]" />
              <div className="absolute -right-3 top-1/4 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_#a855f7]" />
              <div className="absolute bottom-8 left-0 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_14px_#ec4899]" />

              {/* Outer frame */}
              <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-3 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl">
                {/* Neon border */}
                <div className="absolute inset-0 rounded-[2rem] border border-fuchsia-500/10" />

                {/* Image container */}
                <div className="relative h-[420px] w-[320px] overflow-hidden rounded-[1.6rem] border border-white/10 md:h-[520px] md:w-[420px]">
                  <Image
                    src={getOptimizedUrl(
                      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )}
                    alt={t("imageAlt")}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070c]/60 via-transparent to-purple-500/10" />
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-violet-600/20 blur-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}