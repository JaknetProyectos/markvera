"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { servicesEnglish, servicesSpanish } from "@/data/services";
import { Link } from "@/i18n/routing";

export default function Services() {
  const t = useTranslations("servicesSection");
  const locale = useLocale()
  const services = locale == "es" ? servicesSpanish : servicesEnglish;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= services.length - 2 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? services.length - 3 : prev - 1
    );
  };

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#07070c] px-4 py-20 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Ambient glows */}
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-100px] h-[26rem] w-[26rem] rounded-full bg-violet-700/20 blur-3xl" />

        {/* PCB Grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 100%)",
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
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <filter id="blurGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M0 180 H280 L360 110 H620"
            stroke="url(#lineGlow)"
            strokeWidth="2"
            filter="url(#blurGlow)"
          />

          <path
            d="M260 520 H520 L600 440 H900"
            stroke="url(#lineGlow)"
            strokeWidth="2"
            filter="url(#blurGlow)"
          />

          <path
            d="M980 220 H1180 L1260 140 H1540"
            stroke="url(#lineGlow)"
            strokeWidth="2"
            filter="url(#blurGlow)"
          />

          {[360, 600, 1260].map((x, i) => (
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
              filter="url(#blurGlow)"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl font-black text-white md:text-5xl">
            {t("title")}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)`,
            }}
          >
            {services.map((service) => (
              <div
                key={service.slug}
                className="group w-full flex-shrink-0 cursor-pointer md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)]">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.heroImage}
                      alt={service.titulo}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070c]/70 via-transparent to-fuchsia-500/10" />
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between p-6">
                    <h3 className="pr-4 text-lg font-bold leading-tight text-white">
                      {service.titulo}
                    </h3>

                    <Link href={`/servicios/${service.slug}`}>
                      <button
                        type="button"
                        aria-label={t("viewService")}
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 transition-all duration-300 hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-violet-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]"
                      >
                        <ArrowRight className="h-5 w-5 text-fuchsia-300 transition-colors group-hover:text-white" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={prevSlide}
            type="button"
            aria-label={t("previous")}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          >
            <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            type="button"
            aria-label={t("next")}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          >
            <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href={"/servicios"}>
            <Button className="h-12 rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}