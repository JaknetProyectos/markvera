"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { homepagePackagesEnglish,homepagePackagesSpanish } from "@/data/plans";
import { Link } from "@/i18n/routing";

export default function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale()
  const homepagePackages = locale == "es"? homepagePackagesSpanish: homepagePackagesEnglish;

  return (
    <section className="relative overflow-hidden bg-[#07070c] px-4 py-24">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070c]/95 via-[#09090f]/92 to-[#07070c]/95" />

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

        {/* Circuit lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="pricingLine"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <filter id="pricingGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M0 180 H260 L340 110 H620"
            stroke="url(#pricingLine)"
            strokeWidth="2"
            filter="url(#pricingGlow)"
          />

          <path
            d="M980 220 H1180 L1260 140 H1520"
            stroke="url(#pricingLine)"
            strokeWidth="2"
            filter="url(#pricingGlow)"
          />

          <path
            d="M240 700 H480 L560 620 H820"
            stroke="url(#pricingLine)"
            strokeWidth="2"
            filter="url(#pricingGlow)"
          />

          {[340, 560, 1260].map((x, i) => (
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
              filter="url(#pricingGlow)"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-[0.12em] text-white md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
        </div>

        {/* Cards */}
        <div className="mb-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {homepagePackages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                pkg.featured
                  ? "border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-white/[0.04] shadow-[0_0_50px_rgba(168,85,247,0.18)]"
                  : "border-white/10 bg-white/[0.04] hover:border-fuchsia-500/20"
              }`}
            >
              {/* Glow */}
              {pkg.featured && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_60%)]" />
              )}

              {/* Popular badge */}
              {pkg.featured && (
                <div className="absolute right-4 top-4 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300 backdrop-blur-xl">
                  {t("popular")}
                </div>
              )}

              <CardHeader className="relative pb-2 pt-8">
                <h3 className="text-2xl font-black italic tracking-wide text-fuchsia-300 md:text-3xl">
                  {pkg.name}
                </h3>

                <p className="mt-4 text-3xl font-black text-white md:text-4xl">
                  MXN {pkg.price} {t("tax")}
                </p>
              </CardHeader>

              <CardContent className="relative pb-8 pt-6">
                <ul className="mb-8 space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-[0_0_18px_rgba(168,85,247,0.3)]">
                        <Check className="h-3 w-3 text-white" />
                      </div>

                      <span className="text-sm leading-relaxed text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={"/paquetes"}>
                  <Button
                    className={`h-11 w-full rounded-xl text-sm font-semibold transition-all duration-300 ${
                      pkg.featured
                        ? "border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                        : "border border-white/10 bg-white/[0.04] text-white hover:border-fuchsia-500/20 hover:bg-fuchsia-500/10"
                    }`}
                  >
                    {t("moreInfo")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Link href={"/paquetes"}>
          <div className="flex justify-center">
            <Button className="group h-12 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}