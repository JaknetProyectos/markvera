"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LegalEs() {
    return (
        <div className="legal-container">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
      .legal-container {
        background-color: #000000;
        color: #ffffff;
        line-height: 1.7;
        font-family: sans-serif;
        padding: 2rem;
      }

      .legal-container section {
        margin-bottom: 3rem;
      }

      .legal-container h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #da8cfa;
        color: #7dffb3;
        text-shadow: 0 0 8px rgba(26, 255, 140, 0.6);
      }

      .legal-container h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        color: #39ff9c;
        text-shadow: 0 0 6px rgba(57, 255, 156, 0.5);
      }

      .legal-container h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 0.8rem;
        color: #72ffbf;
      }

      .legal-container p {
        margin-bottom: 1.2rem;
        text-align: justify;
        color: #eaeaea;
      }

      .legal-container ul {
        margin-bottom: 1.2rem;
        padding-left: 1.5rem;
        list-style-type: disc;
      }

      .legal-container li {
        margin-bottom: 0.5rem;
        color: #d8d8d8;
      }

      .legal-container a {
        color: #39ff9c;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .legal-container a:hover {
        color: #7dffb3;
        text-decoration: underline;
      }
    `,
                }}
            />

            <section></section>

        </div>
    );
}

function LegalEn() {
    return (
        <div className="legal-container">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
      .legal-container {
        background-color: #000000;
        color: #ffffff;
        line-height: 1.7;
        font-family: sans-serif;
        padding: 2rem;
      }

      .legal-container section {
        margin-bottom: 3rem;
      }

      .legal-container h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #da8cfa;
        color: #7dffb3;
        text-shadow: 0 0 8px rgba(26, 255, 140, 0.6);
      }

      .legal-container h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        color: #39ff9c;
        text-shadow: 0 0 6px rgba(57, 255, 156, 0.5);
      }

      .legal-container h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 0.8rem;
        color: #72ffbf;
      }

      .legal-container p {
        margin-bottom: 1.2rem;
        text-align: justify;
        color: #eaeaea;
      }

      .legal-container ul {
        margin-bottom: 1.2rem;
        padding-left: 1.5rem;
        list-style-type: disc;
      }

      .legal-container li {
        margin-bottom: 0.5rem;
        color: #d8d8d8;
      }

      .legal-container a {
        color: #39ff9c;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .legal-container a:hover {
        color: #7dffb3;
        text-decoration: underline;
      }
    `,
                }}
            />

            <section></section>
        </div>
    );
}

export default function LegalPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Header />
            <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                {locale === "es" ? <LegalEs /> : <LegalEn />}
            </main>
            <Footer />
        </div>
    );
}