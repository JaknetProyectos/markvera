"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { processOctanoPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

const VALID_COUPONS = [
  { code: "MED10", discount: 0.1 },
  { code: "CONFIANZA15", discount: 0.15 },
  { code: "PROMO20", discount: 0.2 },
];

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-[1.85rem] border border-fuchsia-400/10",
        "bg-[linear-gradient(180deg,rgba(18,8,31,0.98)_0%,rgba(9,10,18,0.98)_100%)]",
        "shadow-[0_0_35px_rgba(168,85,247,0.07)] backdrop-blur-xl transition-all duration-300",
        "hover:border-fuchsia-400/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]",
        className,
      ].join(" ")}
    > <div className="pointer-events-none absolute inset-0"> <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" /> <div className="absolute -left-20 top-0 h-full w-[120px] rotate-12 bg-white/[0.04] blur-3xl transition-all duration-1000 group-hover:left-[130%]" /> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.08),transparent_45%)]" /> </div> <div className="relative">{children}</div> </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (<div className="flex items-center gap-3 border-b border-white/5 pb-3"> <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-fuchsia-400/10 bg-fuchsia-400/10 shadow-[0_0_18px_rgba(168,85,247,0.12)]"> <Icon className="h-4 w-4 text-fuchsia-300" /> </div> <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-200">
    {title} </h3> </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (<div className={className}> <label className="mb-1.5 block text-[11px] font-bold text-slate-400">
    {label} </label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={[
        "w-full rounded-xl border border-white/5 bg-[#081019]/80 px-4 py-3",
        "text-xs text-white outline-none transition-all placeholder:text-slate-600",
        "focus:border-fuchsia-400/30 focus:ring-2 focus:ring-fuchsia-400/15",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
        mono ? "font-mono tracking-widest" : "",
        inputClassName,
      ].join(" ")}
    /> </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, totalPrice: totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const discountAmount = appliedCoupon ? totalPrice * appliedCoupon.discount : 0;
  const totalWithDiscount = totalPrice - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");


    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));


  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");


    const uniqueOrderId = `MC-${Date.now()}`;

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processOctanoPayment(paymentPayload);
      console.log(response)

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
            }),
          });
        } catch (emailError) {
          console.error(
            "⚠️ Falló el despacho de correos informativos:",
            emailError
          );
        }

        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }


  };

  if (step === 3) {
    return (<div className="min-h-screen bg-[#05050a] text-slate-100 selection:bg-fuchsia-300 selection:text-[#05050a]"> <Header />


      <main className="mx-auto mt-44 flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-14 pt-32 md:px-6">
        <section className="relative mx-auto w-full max-w-xl">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[120px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[160px]" />

          <CardShell className="p-7 text-center sm:p-9">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white">
              {t("success.title")}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              {t("success.description")}
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 text-left">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs font-semibold text-slate-400">
                  {t("success.transactionStatus")}
                </span>
                <span className="text-[11px] font-bold text-fuchsia-300">
                  {t("success.approved")}
                </span>
              </div>
            </div>

            <Link href="/paquetes" className="mt-8 block">
              <Button className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-6 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.22)] hover:brightness-110">
                {t("success.backToCatalog")}
              </Button>
            </Link>
          </CardShell>
        </section>
      </main>

      <Footer />
    </div>
    );


  }

  return (<div className="min-h-screen overflow-x-hidden bg-[#05050a] text-slate-100 selection:bg-fuchsia-300 selection:text-[#05050a]"> <Header />


    <div className="h-24 md:h-28" />

    <div className="sticky top-[5.8rem] z-40 border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl md:top-[6.4rem]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="transition hover:text-white">
            {t("breadcrumb.home")}
          </Link>
          <span className="text-slate-800">/</span>
          <span
            className={
              step === 1
                ? "font-bold text-fuchsia-300"
                : "text-slate-600"
            }
          >
            {t("breadcrumb.summary")}
          </span>
          <span className="text-slate-800">/</span>
          <span
            className={
              step === 2
                ? "font-bold text-fuchsia-300"
                : "text-slate-600"
            }
          >
            {t("breadcrumb.shippingPayment")}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-fuchsia-300 shadow-[0_0_12px_rgba(236,72,153,0.25)]" : "bg-slate-800"
              }`}
          />
          <div
            className={`h-0.5 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-fuchsia-300 shadow-[0_0_12px_rgba(236,72,153,0.25)]" : "bg-slate-800"
              }`}
          />
          <div
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-fuchsia-300 shadow-[0_0_12px_rgba(236,72,153,0.25)]" : "bg-slate-800"
              }`}
          />
        </div>
      </div>
    </div>

    <main className="relative z-10 py-8 md:py-12">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-fuchsia-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {items.length === 0 ? (
          <CardShell className="mx-auto max-w-lg p-8 text-center sm:p-10">
            <ShoppingBag className="mx-auto mb-5 h-14 w-14 text-slate-700" />
            <h2 className="text-xl font-bold text-white">
              {t("empty.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
              {t("empty.description")}
            </p>
            <Link href="/paquetes" className="mt-8 inline-block">
              <Button className="rounded-xl border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500 to-violet-600 px-8 py-5 text-xs font-semibold text-white transition-all duration-300 hover:brightness-110">
                {t("empty.goToStore")}
              </Button>
            </Link>
          </CardShell>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="space-y-5 lg:col-span-2">
              {errorMessage && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-300">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <CardShell className="flex items-center justify-between p-5">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      {t("order.title")}
                    </h2>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="flex items-center gap-1.5 text-xs font-bold text-red-300 transition hover:text-red-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t("order.clear")}
                    </button>
                  </CardShell>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <CardShell
                        key={item.id}
                        className="p-4 sm:p-5"
                      >
                        <div className="flex gap-4 sm:gap-5">
                          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#081019]/80 p-2">
                            <Link
                              href={`/producto/${item.id}`}
                              className="absolute inset-0"
                            />
                            <Image
                              src={"/logo.png"}
                              alt={item.name}
                              fill
                              className="rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent" />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="mb-1 inline-block rounded-md border border-fuchsia-400/10 bg-fuchsia-400/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.16em] text-fuchsia-300">
                                  {item.id}
                                </p>

                                <h3 className="line-clamp-1 text-sm font-bold text-white">
                                  {item.name}
                                </h3>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/5 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-4">
                              <div className="flex items-center rounded-xl border border-white/5 bg-[#081019]/80 p-0.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>

                                <span className="w-9 text-center text-xs font-bold text-white">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-sm font-black tracking-tight text-white">
                                {formatPrice(
                                  item.price * item.quantity,
                                  "MXN",
                                  true
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardShell>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <form
                  id="octano-payment-form"
                  onSubmit={handleCheckoutSubmit}
                  className="space-y-6"
                >
                  <CardShell className="space-y-5 p-5 sm:p-8">
                    <SectionTitle
                      icon={User}
                      title={t("form.buyerTitle")}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        label={t("form.firstName")}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                      />
                      <Field
                        label={t("form.lastName")}
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                      />
                      <Field
                        label={t("form.email")}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Field
                        label={t("form.phone")}
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                      />
                      <Field
                        label={t("form.company")}
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="sm:col-span-2"
                      />
                    </div>
                  </CardShell>

                  <CardShell className="space-y-5 p-5 sm:p-8">
                    <SectionTitle
                      icon={MapPin}
                      title={t("form.addressTitle")}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        label={t("form.streetAddress")}
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                        placeholder={t("form.streetAddressPlaceholder")}
                        className="sm:col-span-2"
                      />
                      <Field
                        label={t("form.neighborhood")}
                        name="direccion2"
                        value={formData.direccion2}
                        onChange={handleInputChange}
                        placeholder={t("form.neighborhoodPlaceholder")}
                        className="sm:col-span-2"
                      />
                      <Field
                        label={t("form.city")}
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        required
                      />
                      <Field
                        label={t("form.state")}
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        required
                        placeholder={t("form.statePlaceholder")}
                      />
                      <Field
                        label={t("form.postalCode")}
                        name="cp"
                        value={formData.cp}
                        onChange={handleInputChange}
                        required
                      />
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold text-slate-400">
                          {t("form.country")}
                        </label>
                        <select
                          name="pais"
                          value={formData.pais}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-xl border border-white/5 bg-[#081019]/80 px-4 py-3 text-xs text-white outline-none transition-all focus:border-fuchsia-400/30 focus:ring-2 focus:ring-fuchsia-400/15"
                        >
                          <option
                            value="MX"
                            className="bg-[#081019] text-white"
                          >
                            {t("form.mexico")}
                          </option>
                        </select>
                      </div>
                    </div>
                  </CardShell>

                  <CardShell className="space-y-5 p-5 sm:p-8">
                    <SectionTitle
                      icon={CreditCard}
                      title={t("form.paymentTitle")}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field
                        label={t("form.cardNumber")}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={16}
                        placeholder={t("form.cardNumberPlaceholder")}
                        className="sm:col-span-3"
                        mono
                      />
                      <Field
                        label={t("form.cardHolderName")}
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        placeholder={t("form.cardHolderPlaceholder")}
                        className="sm:col-span-3"
                      />
                      <Field
                        label={t("form.expiryMonth")}
                        name="cardMonth"
                        value={formData.cardMonth}
                        onChange={handleInputChange}
                        required
                        maxLength={2}
                        placeholder={t("form.expiryMonthPlaceholder")}
                        mono
                        inputClassName="text-center"
                      />
                      <Field
                        label={t("form.expiryYear")}
                        name="cardYear"
                        value={formData.cardYear}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        placeholder={t("form.expiryYearPlaceholder")}
                        mono
                        inputClassName="text-center"
                      />
                      <Field
                        label={t("form.cvv")}
                        name="cardCvv"
                        type="password"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        placeholder={t("form.cvvPlaceholder")}
                        mono
                        inputClassName="text-center"
                      />
                    </div>
                  </CardShell>
                </form>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-[8.2rem] space-y-6 rounded-[1.85rem] border border-fuchsia-400/10 bg-[linear-gradient(180deg,rgba(18,8,31,0.98)_0%,rgba(9,10,18,0.98)_100%)] p-5 shadow-[0_0_35px_rgba(168,85,247,0.07)] backdrop-blur-xl md:p-6">
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.85rem]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/35 to-transparent" />
                  <div className="absolute left-[-35%] top-0 h-full w-[90px] rotate-12 bg-white/[0.04] blur-2xl transition-all duration-1000 group-hover:left-[140%]" />
                </div>

                <h2 className="relative text-xs font-bold uppercase tracking-[0.22em] text-slate-200">
                  {t("financial.title")}
                </h2>

                <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <Image
                    src="/octano.png"
                    alt={t("images.securePaymentAlt")}
                    width={150}
                    height={20}
                    className="object-contain brightness-200"
                  />
                </div>

                {step === 1 && (
                  <div className="space-y-3 border-b border-white/5 pb-4">
                    {!appliedCoupon ? (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={t("financial.couponPlaceholder")}
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="min-w-0 flex-1 rounded-xl border border-white/5 bg-[#081019]/80 px-4 py-2.5 text-xs text-white outline-none transition-all placeholder:text-slate-600 focus:border-fuchsia-400/30 focus:ring-2 focus:ring-fuchsia-400/15"
                        />
                        <button
                          type="submit"
                          className="rounded-xl border border-white/5 bg-white/[0.04] px-4 text-xs font-bold text-white transition hover:border-fuchsia-400/20 hover:bg-fuchsia-400/10 hover:text-fuchsia-300"
                        >
                          {t("financial.applyCoupon")}
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-fuchsia-400/15 bg-fuchsia-400/10 p-3">
                        <div className="min-w-0 text-xs font-medium text-fuchsia-200">
                          {t("financial.appliedCoupon", {
                            code: appliedCoupon.code,
                            discount: appliedCoupon.discount * 100,
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedCoupon(null)}
                          className="shrink-0 text-[10px] font-bold text-red-300 transition hover:text-red-200"
                        >
                          {t("financial.remove")}
                        </button>
                      </div>
                    )}

                    {couponError && (
                      <p className="pl-1 text-[10px] font-semibold text-red-300">
                        ⚠️ {couponError}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-3.5 border-b border-white/5 pb-4 text-xs font-medium text-slate-400">
                  <div className="flex justify-between gap-4">
                    <span>{t("financial.subtotal")}</span>
                    <span className="font-mono font-bold text-white">
                      {formatPrice(totalPrice, "MXN", true)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between gap-4 text-fuchsia-300">
                      <span>{t("financial.discount")}</span>
                      <span className="font-mono font-bold">
                        -{formatPrice(discountAmount, "MXN", true)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-bold text-slate-300">
                      {t("financial.netTotal")}
                    </span>
                    <span className="text-2xl font-black tracking-tight text-white">
                      {formatPrice(grandTotal, "MXN", true)}
                    </span>
                  </div>

                  <p className="mt-1 text-right text-[10px] text-slate-500">
                    {t("financial.tax", {
                      tax: formatPrice(iva, "MXN", true),
                    })}
                  </p>
                </div>

                {step === 1 ? (
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-6 text-xs font-bold text-white shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.18)]"
                  >
                    {t("actions.proceedToPayment")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      form="octano-payment-form"
                      disabled={isProcessing}
                      className={[
                        "w-full rounded-xl py-6 text-xs font-bold tracking-widest transition-all duration-300",
                        isProcessing
                          ? "cursor-wait bg-slate-800 text-slate-500"
                          : "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md hover:brightness-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.18)]",
                      ].join(" ")}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t("actions.processing")}</span>
                        </span>
                      ) : (
                        t("actions.payAmount", {
                          amount: formatPrice(grandTotal, "MXN", true),
                        })
                      )}
                    </Button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => setStep(1)}
                      className="flex w-full items-center justify-center gap-1 py-1 text-xs font-bold text-slate-400 transition hover:text-white"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      {t("actions.backToCart")}
                    </button>
                  </div>
                )}

                <div className="border-t border-white/5 pt-4 text-center">
                  <p className="px-2 text-[10px] font-medium leading-relaxed text-slate-500">
                    {t("security.note")}
                  </p>

                  <div className="mt-3 flex items-center justify-center">
                    <Image
                      src="/secure-payment.png"
                      alt={t("images.securePaymentAlt")}
                      width={100}
                      height={20}
                      className="object-contain invert brightness-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>

    <Footer />
  </div>


  );
}
