"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";

import { servicesEnglish, servicesSpanish } from "@/data/services";
import { getOptimizedUrl } from "@/lib/images";




export default function ServiciosPage() {
  const t = useTranslations("services");
  const locale = useLocale()
  const services = locale == "es" ? servicesSpanish : servicesEnglish;

  const serviceButtons = services.map((s) => ({
    id: s.slug,
    label: s.titulo,
  }));

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a]">
      <Header />

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Navigation */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 py-12">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-violet-700/10 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => scrollToService(btn.id)}
                type="button"
                className="group relative overflow-hidden rounded-full border border-fuchsia-400/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/[0.08] hover:text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.18)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-fuchsia-300 transition-transform duration-300 group-hover:rotate-12" />
                  {btn.label}
                </span>

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0">
          <div className="absolute left-[-140px] top-[15%] h-[340px] w-[340px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
          <div className="absolute right-[-120px] bottom-[10%] h-[320px] w-[320px] rounded-full bg-violet-700/10 blur-[140px]" />

          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 1600 1400"
            fill="none"
          >
            <defs>
              <linearGradient
                id="servicesLine"
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
              d="M0 200 H420 L520 120 H820"
              stroke="url(#servicesLine)"
              strokeWidth="2"
            />

            <path
              d="M760 760 H1120 L1220 680 H1600"
              stroke="url(#servicesLine)"
              strokeWidth="2"
            />

            <path
              d="M0 1180 H300 L380 1100 H700"
              stroke="url(#servicesLine)"
              strokeWidth="2"
            />

            {[520, 1220, 380].map((x, i) => (
              <polygon
                key={i}
                points={`
                  ${x},102
                  ${x + 14},110
                  ${x + 14},126
                  ${x},134
                  ${x - 14},126
                  ${x - 14},110
                `}
                stroke="#d946ef"
                strokeWidth="1.5"
                fill="rgba(168,85,247,0.08)"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          {services.map((service, index) => (
            <div
              key={service.slug}
              id={service.slug}
              className="group relative overflow-hidden rounded-[2rem] border border-fuchsia-400/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-fuchsia-400/20 hover:bg-fuchsia-500/[0.03]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-[80px]" />
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]" />
              </div>

              <div
                className={`relative z-10 grid items-center gap-10 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/5">
                    <Image
                      src={service.heroImage}
                      alt={service.titulo}
                      width={700}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/30 to-transparent" />
                  </div>
                </div>

                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                      {t("service.badge")}
                    </span>
                  </div>

                  <h2 className="mb-5 text-3xl font-black leading-tight text-white md:text-4xl">
                    {service.titulo}
                  </h2>

                  <p className="mb-8 text-lg leading-relaxed text-slate-300">
                    {service.descripcion}
                  </p>

                  <Link href={`/servicios/${service.slug}`}>
                    <Button className="group/btn h-12 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                      <span className="flex items-center gap-2">
                        {t("service.readMore")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/25 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,28,135,0.28),transparent_60%),#07070d]" />
        <div className="absolute left-[-100px] bottom-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-700/15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-fuchsia-400/15 bg-[linear-gradient(180deg,rgba(36,15,56,0.96)_0%,rgba(10,10,18,0.98)_100%)] shadow-[0_0_60px_rgba(168,85,247,0.12)]">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative min-h-[350px] overflow-hidden">
                <Image
                  src={getOptimizedUrl(
                    "https://plus.unsplash.com/premium_photo-1674478876962-6703253531c4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("cta.imageAlt")}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#07070d]/40" />
              </div>

              <div className="flex flex-col justify-center p-10 lg:p-14">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-fuchsia-300" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                    {t("cta.badge")}
                  </span>
                </div>

                <h2 className="mb-5 text-3xl font-black leading-tight text-white md:text-4xl">
                  {t("cta.title")}
                </h2>

                <p className="mb-8 text-lg leading-relaxed text-slate-300">
                  {t("cta.description")}
                </p>

                <div>
                  <Link href="/paquetes">
                    <Button className="group h-12 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                      <span className="flex items-center gap-2">
                        {t("cta.button")}
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}