"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

export default function PageBanner({
  title,
  breadcrumb,
}: PageBannerProps) {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden px-4 pt-28">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1697952431907-8542919a16b3?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Main overlays */}
      <div className="absolute inset-0 bg-[#05050a]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_45%)]" />

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[340px] w-[340px] rounded-full bg-violet-700/20 blur-[130px]" />

      {/* PCB Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Circuit Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1600 700"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="bannerLine"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>

          <filter id="bannerGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M0 220 H300 L380 140 H700"
          stroke="url(#bannerLine)"
          strokeWidth="2"
          filter="url(#bannerGlow)"
        />

        <path
          d="M980 280 H1220 L1320 180 H1600"
          stroke="url(#bannerLine)"
          strokeWidth="2"
          filter="url(#bannerGlow)"
        />

        {[380, 1320].map((x, i) => (
          <polygon
            key={i}
            points={`
              ${x},122
              ${x + 16},131
              ${x + 16},149
              ${x},158
              ${x - 16},149
              ${x - 16},131
            `}
            stroke="#d946ef"
            strokeWidth="1.5"
            fill="rgba(168,85,247,0.08)"
            filter="url(#bannerGlow)"
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-fuchsia-300" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
            {breadcrumb}
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Breadcrumb */}
        <div className="mt-8 flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-white/[0.04] px-6 py-3 backdrop-blur-xl">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-fuchsia-300"
          >
            Inicio
          </Link>

          <div className="flex items-center text-fuchsia-400">
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="-ml-2 h-4 w-4 opacity-70" />
          </div>

          <span className="text-sm font-semibold text-fuchsia-300">
            {breadcrumb}
          </span>
        </div>
      </div>
    </section>
  );
}