"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Mail,
  Phone,
  Menu,
  ChevronDown,
  ChevronRight,
  Globe,
  ShoppingCart,
  Sparkles,
  CircuitBoard,
  Rocket,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { servicesEnglish, servicesSpanish } from "@/data/services";

type ServiceItem = {
  slug: string;
  titulo: string;
};

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale()
  const services = locale == "es" ? servicesSpanish : servicesEnglish;

  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { totalItems } = useCart();

  const typedServices = services as ServiceItem[];

  return (
    <header className="w-full border-b border-white/10 bg-[#090912] text-white shadow-[0_0_40px_rgba(168,85,247,0.12)]">
      {/* Top bar */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[linear-gradient(90deg,rgba(168,85,247,0.14),rgba(236,72,153,0.10),rgba(59,130,246,0.08))] px-4 py-2">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-sm sm:flex-row">
          <a
            href="mailto:atencion@mark-vera.com"
            className="flex items-center gap-2 text-white/70 transition hover:text-fuchsia-200"
          >
            <Mail className="h-4 w-4 text-fuchsia-300" />
            atencion@mark-vera.com
          </a>

          <a
            href="tel:+5215519458234"
            className="flex items-center gap-2 text-white/70 transition hover:text-fuchsia-200"
          >
            <Phone className="h-4 w-4 text-fuchsia-300" />
            +52 1 551945 8234
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0b16]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl">
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={28}
                height={28}
                className="relative z-10 h-7 w-7"
              />
            </div>

            <div className="leading-tight">
              <Image
                src="/title.png"
                alt={t("titleAlt")}
                width={150}
                height={28}
                className="relative z-10 h-7"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              <Rocket className="h-4 w-4 text-pink-300" />
              {t("nav.home")}
            </Link>

            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-violet-300" />
              {t("nav.about")}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-[linear-gradient(180deg,rgba(168,85,247,0.14),rgba(255,255,255,0.03))] px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(168,85,247,0.12)] transition hover:border-fuchsia-300/40"
              >
                <CircuitBoard className="h-4 w-4 text-fuchsia-300" />

                {t("nav.services")}

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Invisible bridge para evitar perder hover */}
              <div className="absolute left-0 top-full h-4 w-full" />

              <div
                className={`absolute left-0 top-[calc(100%+12px)] z-50 w-[340px] transition-all duration-200 ${isServicesOpen
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
                  }`}
              >
                <div className="overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-[#10101d]/95 p-2 shadow-[0_0_40px_rgba(168,85,247,0.22)] backdrop-blur-xl">
                  {/* Header */}
                  <div className="mb-2 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(236,72,153,0.10),rgba(168,85,247,0.12))] p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200/80">
                      <CircuitBoard className="h-4 w-4" />
                      {t("services.title")}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {t("services.description")}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="max-h-[420px] overflow-auto pr-1">
                    {typedServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/servicios/${service.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/10 text-fuchsia-200 shadow-[0_0_18px_rgba(236,72,153,0.12)]">
                            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                          </span>

                          <span className="leading-snug">
                            {service.titulo}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              <Globe className="h-4 w-4 text-violet-300" />
              {t("nav.contact")}
            </Link>

            <Link
              href="/carrito"
              className="relative inline-flex items-center rounded-full p-3 text-white/80 transition hover:bg-white/5 hover:text-white"
              aria-label={t("cart")}
            >
              <ShoppingCart className="h-5 w-5" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-400 text-[11px] font-bold text-[#0c0b16] shadow-[0_0_14px_rgba(236,72,153,0.8)]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* CTA Button */}
          <Link href="/paquetes" className="hidden lg:block">
            <Button className="rounded-full border border-fuchsia-300/20 bg-[linear-gradient(135deg,rgba(236,72,153,0.95),rgba(168,85,247,0.95))] px-6 font-semibold text-white shadow-[0_0_22px_rgba(168,85,247,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.32)]">
              {t("packages")}
            </Button>
          </Link>

          {/* Mobile menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/carrito"
              className="relative inline-flex items-center rounded-full p-2 text-white/80 transition hover:bg-white/5 hover:text-white"
              aria-label={t("cart")}
            >
              <ShoppingCart className="h-5 w-5" />

              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-400 text-[11px] font-bold text-[#0c0b16]">
                  {totalItems}
                </span>
              )}
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("openMenu")}
                  className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-fuchsia-200"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-white/10 bg-[#0c0b16] text-white"
              >
                <div className="mt-8 flex flex-col gap-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-3 text-lg font-medium text-white/90 transition hover:text-fuchsia-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Rocket className="h-5 w-5 text-pink-300" />
                    {t("nav.home")}
                  </Link>

                  <Link
                    href="/nosotros"
                    className="inline-flex items-center gap-3 text-lg font-medium text-white/90 transition hover:text-fuchsia-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="h-5 w-5 text-violet-300" />
                    {t("nav.about")}
                  </Link>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <Link
                      href="/servicios"
                      className="mb-3 inline-flex items-center gap-2 text-lg font-semibold text-fuchsia-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <CircuitBoard className="h-5 w-5" />
                      {t("nav.services")}
                    </Link>

                    <div className="space-y-2">
                      {typedServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <ChevronRight className="h-4 w-4 text-fuchsia-300" />
                          {service.titulo}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-3 text-lg font-medium text-white/90 transition hover:text-fuchsia-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Globe className="h-5 w-5 text-violet-300" />
                    {t("nav.contact")}
                  </Link>

                  <Link href="/paquetes" onClick={() => setIsOpen(false)}>
                    <Button className="mt-2 w-full rounded-full bg-[linear-gradient(135deg,rgba(236,72,153,0.95),rgba(168,85,247,0.95))] font-semibold text-white shadow-[0_0_22px_rgba(168,85,247,0.28)]">
                      {t("packages")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}