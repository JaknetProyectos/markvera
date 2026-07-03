import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CircuitBoard,
  ChevronDown,
  ChevronRight,
  Globe,
  Layers3,
  Rocket,
  Star,
} from "lucide-react";


import { servicesEnglish, servicesSpanish } from "@/data/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, getTranslations } from "next-intl/server";

type PageProps = {
  params: {
    slug: string;
  };
};

type ServiceStep = {
  titulo: string;
  descripcion: string;
};

type Service = {
  slug: string;
  titulo: string;
  descripcion: string[];
  beneficios: string[];
  comoLoHacemos: ServiceStep[];
  heroImage: string;
  featureImage: string;
};

export function generateStaticParams() {
  return servicesSpanish.map((service) => ({
    slug: service.slug,
  }));
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (<div className="mb-6"> <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 shadow-[0_0_18px_rgba(236,72,153,0.15)]"> <Icon className="h-4 w-4" />
    {title} </div>


    {subtitle ? (
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
        {subtitle}
      </p>
    ) : null}
  </div>


  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getTranslations("serviceDetail");
  const { slug } = await params;

  const locale = await getLocale()
  const services = locale == "es" ? servicesSpanish : servicesEnglish;

  const servicio = services.find((item) => item.slug === slug) as
    | Service
    | undefined;

  const otherServices = services.filter((item) => item.slug !== slug);

  if (!servicio) {
    return (
      <> <Header />


        <main className="min-h-screen overflow-hidden bg-[#0b0b14] text-white">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.14),_transparent_22%),radial-gradient(circle_at_80%_30%,_rgba(139,92,246,0.16),_transparent_18%)]" />
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(168,85,247,0.35)_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
              <div className="w-full rounded-[2rem] border border-fuchsia-400/15 bg-[#0f0f1a]/80 p-8 text-center shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl sm:p-12">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200">
                  <Rocket className="h-4 w-4" />
                  {t("hero.tag")}
                </div>

                <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {t("notFound.title")}
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/70">
                  {t("notFound.description")}
                </p>

                <div className="mt-8">
                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                  >
                    {t("notFound.button")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );


  }

  return (
    <> <Header />


      <main className="min-h-screen overflow-hidden bg-[#0b0b14] text-white">
        <div className="relative">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.14),_transparent_22%),radial-gradient(circle_at_80%_30%,_rgba(139,92,246,0.16),_transparent_18%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(168,85,247,0.35)_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {/* Hero */}
            <section className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-fuchsia-400/15 bg-[#0f0f1a]/80 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl">
              <div className="absolute inset-0">
                {servicio.heroImage ? (
                  <Image
                    src={servicio.heroImage}
                    alt={servicio.titulo}
                    fill
                    priority
                    className="object-cover opacity-30"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_28%),linear-gradient(135deg,#0b0b14,#121225,#0b0b14)]" />
                )}

                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:50px_50px]" />
                <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />
              </div>

              <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 shadow-[0_0_18px_rgba(236,72,153,0.2)]">
                  <Rocket className="h-4 w-4" />
                  {t("hero.tag")}
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {servicio.titulo}
                </h1>

                <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/65">
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className="transition hover:text-white">
                        {t("breadcrumb.home")}
                      </Link>
                    </li>
                    <li className="text-white/30">›</li>
                    <li>
                      <Link href="/servicios" className="transition hover:text-white">
                        {t("breadcrumb.services")}
                      </Link>
                    </li>
                    <li className="text-white/30">›</li>
                    <li className="font-medium text-fuchsia-200">
                      {servicio.titulo}
                    </li>
                  </ol>
                </nav>
              </div>
            </section>

            {/* Feature + services list */}
            <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(236,72,153,0.12)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full bg-[#111120]">
                  {servicio.featureImage ? (
                    <Image
                      src={servicio.featureImage}
                      alt={servicio.titulo}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(168,85,247,0.18),rgba(236,72,153,0.12),rgba(11,11,20,1))]">
                      <div className="text-center">
                        <div className="text-sm uppercase tracking-[0.4em] text-white/50">
                          {t("feature.placeholderLabel")}
                        </div>
                        <div className="mt-3 text-xl text-white/80">
                          {t("feature.placeholderDescription")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(168,85,247,0.10)] backdrop-blur-xl">
                <SectionTitle
                  icon={Globe}
                  title={t("aside.title")}
                  subtitle={t("aside.subtitle")}
                />

                <div className="space-y-2">
                  {otherServices.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/servicios/${item.slug}`}
                      className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-white/80 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-white"
                    >
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/10 text-fuchsia-200 shadow-[0_0_18px_rgba(236,72,153,0.12)]">
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-sm leading-6">{item.titulo}</span>
                    </Link>
                  ))}
                </div>
              </aside>
            </section>

            {/* Description + benefits + process */}
            <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(168,85,247,0.10)] backdrop-blur-xl sm:p-8">
                <SectionTitle
                  icon={Layers3}
                  title={t("description.title")}
                  subtitle={t("description.subtitle")}
                />

                <h2 className="text-3xl font-semibold text-white">
                  {servicio.titulo}
                </h2>

                <div className="mt-5 space-y-4 text-base leading-8 text-white/75">
                  {servicio.descripcion.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10">
                  <SectionTitle
                    icon={BadgeCheck}
                    title={t("benefits.title")}
                    subtitle={t("benefits.subtitle")}
                  />

                  <ul className="mt-5 space-y-3">
                    {servicio.beneficios.map((beneficio, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-white/80"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.85)]" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(236,72,153,0.08)] backdrop-blur-xl sm:p-8">
                <SectionTitle
                  icon={CircuitBoard}
                  title={t("process.title")}
                  subtitle={t("process.subtitle")}
                />

                <div className="mt-6 space-y-4">
                  {servicio.comoLoHacemos.map((paso, index) => (
                    <details
                      key={index}
                      className="group rounded-2xl border border-white/10 bg-black/20 p-4 open:border-fuchsia-400/30 open:bg-fuchsia-500/10"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium text-white">
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fuchsia-200 shadow-[0_0_18px_rgba(168,85,247,0.12)]">
                            <Star className="h-4 w-4" />
                          </span>
                          <span>{paso.titulo}</span>
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition group-open:rotate-180 group-open:border-fuchsia-400/30 group-open:text-fuchsia-200">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </summary>

                      <div className="mt-4 border-l border-fuchsia-400/30 pl-4 text-sm leading-7 text-white/75">
                        {paso.descripcion}
                      </div>
                    </details>
                  ))}
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
