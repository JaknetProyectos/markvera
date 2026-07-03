"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Rocket,
  Layers3,
  Package,
  Mail,
  Smartphone,
  Code2,
  Workflow,
  Cpu,
  Bot,
  ShieldCheck,
  FileText,
  ReceiptText,
  BadgeDollarSign,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [
    {
      name: t("navigation.about"),
      href: "/nosotros",
      icon: Rocket,
      color: "text-fuchsia-400",
      glow: "group-hover:shadow-fuchsia-500/30",
    },
    {
      name: t("navigation.services"),
      href: "/servicios",
      icon: Layers3,
      color: "text-violet-400",
      glow: "group-hover:shadow-violet-500/30",
    },
    {
      name: t("navigation.packages"),
      href: "/paquetes",
      icon: Package,
      color: "text-pink-400",
      glow: "group-hover:shadow-pink-500/30",
    },
    {
      name: t("navigation.contact"),
      href: "/contacto",
      icon: Mail,
      color: "text-cyan-400",
      glow: "group-hover:shadow-cyan-500/30",
    },
  ];

  const services = [
    {
      name: t("services.mobileApps"),
      href: "/servicios/desarrollo-de-aplicaciones-moviles",
      icon: Smartphone,
    },
    {
      name: t("services.customSoftware"),
      href: "/servicios/desarrollo-de-software-a-medida",
      icon: Code2,
    },
    {
      name: t("services.systemIntegration"),
      href: "/servicios/integracion-de-sistemas",
      icon: Workflow,
    },
    {
      name: t("services.techConsulting"),
      href: "/servicios/consultoria-tecnologica",
      icon: Cpu,
    },
    {
      name: t("services.automation"),
      href: "/servicios/automatizacion-de-procesos",
      icon: Bot,
    },
    {
      name: t("services.support"),
      href: "/servicios/soporte-y-mantenimiento",
      icon: ShieldCheck,
    },
  ];

  const policies = [
    {
      name: t("legal.privacy"),
      href: "/legal/privacidad",
      icon: FileText,
    },
    {
      name: t("legal.terms"),
      href: "/legal/terminos",
      icon: ReceiptText,
    },
    {
      name: t("legal.refunds"),
      href: "/legal/reembolsos",
      icon: BadgeDollarSign,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#09090f] text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-80 w-80 rounded-full bg-violet-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1">
              <Rocket className="h-4 w-4 text-fuchsia-400" />

              <span className="text-sm font-medium text-fuchsia-300">
                {t("about.badge")}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              {t("about.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
              {t("titles.navigation")}
            </h3>

            <ul className="space-y-2.5">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-black/30 shadow-lg transition-all duration-300 ${link.glow}`}
                      >
                        <Icon className={`h-4 w-4 ${link.color}`} />
                      </div>

                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-pink-300">
              {t("titles.services")}
            </h3>

            <ul className="space-y-2">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-fuchsia-300"
                    >
                      <Icon className="h-4 w-4 text-violet-400 transition-transform duration-300 group-hover:scale-110" />

                      <span>{service.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {t("titles.legal")}
            </h3>

            <ul className="space-y-2">
              {policies.map((policy) => {
                const Icon = policy.icon;

                return (
                  <li key={policy.name}>
                    <Link
                      href={policy.href}
                      className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-cyan-300"
                    >
                      <Icon className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />

                      <span>{policy.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Contact */}
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_#e879f9]" />

              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                {t("titles.contact")}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />

                <p>{t("contact.address")}</p>
              </div>

              <a
                href="tel:+5215519458234"
                className="group inline-flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-fuchsia-300"
              >
                <Phone className="h-4 w-4 text-pink-400 transition-transform duration-300 group-hover:rotate-12" />

                +52 1 551945 8234
              </a>
            </div>
          </div>

          {/* Payments */}
          <div className="flex items-center gap-4 lg:justify-end">
            <div className="rounded-xl border border-white/10 bg-white/95 p-2 shadow-[0_0_25px_rgba(168,85,247,0.12)] backdrop-blur">
              <Image
                src="/cards.png"
                alt={t("paymentsAlt")}
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 bg-black/30 px-4 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center md:flex-row">
          <p className="text-xs text-gray-500">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}