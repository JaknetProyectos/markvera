"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Check,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import Image from "next/image";

import {
  mainPackagesEnglish,
  mainPackagesSpanish,
  consultingServicesEnglish,
  consultingServicesSpanish
} from "@/data/plans";

import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";

export default function PaquetesPage() {
  const t = useTranslations("packages");
  const locale = useLocale()
  const mainPackages = locale == "es" ? mainPackagesSpanish : mainPackagesEnglish;
  const consultingServices = locale == "es" ? consultingServicesSpanish : consultingServicesEnglish;

  const { addItem } = useCart();

  const [addedId, setAddedId] = useState<string | null>(null);

  const glowCircles = useMemo(
    () => (
      <>
        <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-fuchsia-600/20 blur-[140px]" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-violet-700/20 blur-[140px]" />
      </>
    ),
    []
  );

  const handleAddToCart = (pkg: {
    id: string;
    name: string;
    price: number;
    sku?: string;
  }) => {
    addItem({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      sku: pkg.sku,
    });

    setAddedId(pkg.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a]">
      <Header />

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Main Packages */}
      <section className="relative overflow-hidden px-4 py-20">
        {glowCircles}

        {/* PCB + hex background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" />

          <div className="absolute inset-0 bg-[#05050a]/95" />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 1600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="packagesLine"
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
              d="M0 180 H280 L340 120 H620"
              stroke="url(#packagesLine)"
              strokeWidth="2"
            />

            <path
              d="M1020 260 H1280 L1360 180 H1600"
              stroke="url(#packagesLine)"
              strokeWidth="2"
            />

            {[340, 1360].map((x, i) => (
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

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-fuchsia-300" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                {t("main.badge")}
              </span>
            </div>

            <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
              {t("main.title")}
            </h2>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainPackages.map((pkg) => {
              const added = addedId === pkg.id;

              return (
                <Card
                  key={pkg.id}
                  className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 ${pkg.featured
                    ? "border-fuchsia-400/30 bg-[linear-gradient(180deg,rgba(36,15,56,0.98)_0%,rgba(10,10,18,0.98)_100%)] shadow-[0_0_45px_rgba(217,70,239,0.16)]"
                    : "border-white/5 bg-[linear-gradient(180deg,rgba(18,18,28,0.98)_0%,rgba(8,8,14,0.98)_100%)] hover:border-fuchsia-400/20"
                    }`}
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />

                    <div className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/[0.04] blur-2xl transition-all duration-1000 group-hover:left-[130%]" />
                  </div>

                  {pkg.featured && (
                    <div className="absolute right-4 top-4 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-200">
                      {t("main.featured")}
                    </div>
                  )}

                  <CardHeader className="relative pb-3 pt-7">
                    <span className="mb-3 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {t("main.packageLabel", { number: pkg.number })}
                    </span>

                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {pkg.name}
                    </h3>

                    <p className="mt-4 text-3xl font-black text-fuchsia-300">
                      MXN ${pkg.price.toLocaleString()}.00{" "}
                      <span className="text-sm font-medium text-slate-500">
                        {t("main.tax")}
                      </span>
                    </p>

                    {pkg.sku && (
                      <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-slate-600">
                        SKU: {pkg.sku}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="relative pt-3 pb-7">
                    <ul className="mb-7 space-y-3">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10">
                            <Check className="h-3 w-3 text-fuchsia-300" />
                          </div>

                          <span className="text-sm leading-relaxed text-slate-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleAddToCart(pkg)}
                      className={`group/btn relative w-full overflow-hidden rounded-xl py-6 text-sm font-bold transition-all duration-300 ${pkg.featured
                        ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                        : "border border-fuchsia-400/15 bg-white/[0.03] text-white hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10"
                        }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {added ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            {t("buttons.added")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            {t("buttons.startNow")}
                          </>
                        )}
                      </span>

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consulting */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#07070d] px-4 py-20">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-700/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mx-auto mb-5 max-w-4xl text-2xl font-black leading-tight text-white md:text-3xl lg:text-4xl">
              {t("consulting.title")}
            </h2>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-400">
              {t("consulting.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((service) => {
              const added = addedId === service.id;

              return (
                <Card
                  key={service.id}
                  className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 ${service.featured
                    ? "border-fuchsia-400/30 bg-[linear-gradient(180deg,rgba(36,15,56,0.98)_0%,rgba(10,10,18,0.98)_100%)] shadow-[0_0_45px_rgba(217,70,239,0.16)]"
                    : "border-white/5 bg-[linear-gradient(180deg,rgba(18,18,28,0.98)_0%,rgba(8,8,14,0.98)_100%)] hover:border-fuchsia-400/20"
                    }`}
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
                  </div>

                  <CardHeader className="relative pb-3 pt-7">
                    <h3 className="text-xl font-black leading-tight text-white">
                      {service.name}
                    </h3>

                    <p className="mt-4 text-3xl font-black text-fuchsia-300">
                      MXN ${service.price.toLocaleString()}.00{" "}
                      <span className="text-sm font-medium text-slate-500">
                        {t("main.tax")}
                      </span>
                    </p>
                  </CardHeader>

                  <CardContent className="relative pt-3 pb-7">
                    <ul className="mb-7 space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/15 bg-fuchsia-500/10">
                            <Check className="h-3 w-3 text-fuchsia-300" />
                          </div>

                          <span className="text-sm leading-relaxed text-slate-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleAddToCart(service)}
                      className={`group/btn relative w-full overflow-hidden rounded-xl py-6 text-sm font-bold transition-all duration-300 ${service.featured
                        ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                        : "border border-fuchsia-400/15 bg-white/[0.03] text-white hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10"
                        }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {added ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            {t("buttons.added")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            {t("buttons.startNow")}
                          </>
                        )}
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />

        <div className="absolute inset-0 bg-[#05050a]/90" />

        <div className="absolute left-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[140px]" />
        <div className="absolute right-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-violet-700/20 blur-[140px]" />

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-fuchsia-400/10 bg-white/[0.03] p-6 backdrop-blur-xl md:grid-cols-2 md:p-10">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/5">
            <Image
              src={getOptimizedUrl(
                "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              )}
              alt={t("cta.imageAlt")}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/40 to-transparent" />
          </div>

          <div className="text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              {t("cta.badge")}
            </p>

            <h2 className="mb-5 text-3xl font-black leading-tight md:text-4xl">
              {t("cta.title")}
            </h2>

            <p className="mb-8 text-base leading-relaxed text-slate-400">
              {t("cta.description")}
            </p>

            <Link href={"/paquete-personalizado"}>
              <Button className="group rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-7 py-6 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.28)]">
                {t("cta.button")}

                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}