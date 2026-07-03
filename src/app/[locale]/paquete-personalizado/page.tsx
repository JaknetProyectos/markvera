"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import {
  ArrowRight,
  CreditCard,
  FileText,
  Package2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CustomPackagePage() {
  const t = useTranslations("customPackagePage");

  const { addItem } = useCart();

  const [folio, setFolio] = useState("");
  const [amount, setAmount] = useState("");

  const numericAmount = useMemo(() => {
    const parsed = Number(amount);
    return isNaN(parsed) ? 0 : parsed;
  }, [amount]);

  const formattedTotal = useMemo(() => {
    return numericAmount.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [numericAmount]);

  const handleAddToCart = () => {
    if (!folio.trim()) return;
    if (numericAmount <= 0) return;

    addItem({
      id: `custom-package-${folio}-${Date.now()}`,
      name: `${t("product.name")} - ${folio}`,
      price: numericAmount,
      sku: folio,
    });

    setFolio("");
    setAmount("");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#0b0b14] text-white">
        <div className="relative">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.14),_transparent_22%),radial-gradient(circle_at_80%_30%,_rgba(139,92,246,0.16),_transparent_18%)]" />

            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Hero */}
            <section className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-fuchsia-400/15 bg-[#0f0f1a]/80 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_28%),linear-gradient(135deg,#0b0b14,#121225,#0b0b14)]" />

              <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:50px_50px]" />

              <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 shadow-[0_0_18px_rgba(236,72,153,0.15)]">
                  <Sparkles className="h-4 w-4" />
                  {t("hero.badge")}
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>

                <nav
                  aria-label="Breadcrumb"
                  className="mt-6 text-sm text-white/65"
                >
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className="transition hover:text-white">
                        {t("breadcrumb.home")}
                      </Link>
                    </li>

                    <li className="text-white/30">›</li>

                    <li>
                      <Link
                        href="/servicios"
                        className="transition hover:text-white"
                      >
                        {t("breadcrumb.services")}
                      </Link>
                    </li>

                    <li className="text-white/30">›</li>

                    <li>
                      <Link
                        href="/paquetes"
                        className="transition hover:text-white"
                      >
                        {t("breadcrumb.packages")}
                      </Link>
                    </li>

                    <li className="text-white/30">›</li>

                    <li className="font-medium text-fuchsia-200">
                      {t("breadcrumb.current")}
                    </li>
                  </ol>
                </nav>
              </div>
            </section>

            {/* Content */}
            <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              {/* Image */}
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(236,72,153,0.10)] backdrop-blur-xl">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                    alt={t("product.imageAlt")}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,20,0.88),rgba(11,11,20,0.18),transparent)]" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                      <Package2 className="h-4 w-4 text-fuchsia-300" />
                      {t("product.name")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(168,85,247,0.10)] backdrop-blur-xl sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-fuchsia-200">
                  <FileText className="h-4 w-4" />
                  {t("form.badge")}
                </div>

                <h2 className="mt-5 text-3xl font-semibold text-white">
                  {t("product.name")}
                </h2>

                <div className="mt-4 space-y-3 text-base leading-8 text-white/70">
                  <p className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-fuchsia-300" />
                    {t("description.contactAdvisor")}
                  </p>

                  <p>
                    {t("description.instructions")}
                  </p>
                </div>

                {/* Form fields */}
                <div className="mt-10 space-y-6">
                  {/* Folio */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                      <FileText className="h-4 w-4 text-fuchsia-300" />
                      {t("form.folioLabel")}
                    </label>

                    <input
                      type="text"
                      placeholder={t("form.folioPlaceholder")}
                      value={folio}
                      onChange={(e) => setFolio(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400/40 focus:bg-fuchsia-500/5"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                      <CreditCard className="h-4 w-4 text-fuchsia-300" />
                      {t("form.amountLabel")}
                    </label>

                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50">
                        $
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-10 pr-5 text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400/40 focus:bg-fuchsia-500/5"
                      />
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-3xl border border-fuchsia-400/15 bg-[linear-gradient(135deg,rgba(168,85,247,0.12),rgba(236,72,153,0.08))] p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                          {t("total.label")}
                        </p>

                        <h3 className="mt-2 text-4xl font-semibold text-white">
                          ${formattedTotal}
                        </h3>
                      </div>

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                        <ShoppingCart className="h-7 w-7 text-fuchsia-300" />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={!folio.trim() || numericAmount <= 0}
                    className="group h-14 w-full rounded-2xl border border-fuchsia-300/20 bg-[linear-gradient(135deg,rgba(236,72,153,0.95),rgba(168,85,247,0.95))] text-base font-semibold text-white shadow-[0_0_22px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(236,72,153,0.32)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("form.addToCart")}

                    <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}