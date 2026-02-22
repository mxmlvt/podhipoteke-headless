"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nip: "",
    amount: "",
    collateral: "",
    purpose: "",
    period: "",
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert("Dziękujemy! Twój formularz został wysłany. Skontaktujemy się z Tobą wkrótce.");
  };

  return (
    <section id="contact-form" className="relative overflow-hidden">
      <Image
        src="/images/contact-bg.png"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-white/[0.86]" />
      <div className="relative z-10 py-16">
        <div className="max-w-[1330px] mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Benefits */}
            <div>
              <h2 className="text-[2.1rem] font-bold text-primary mb-8">WYPEŁNIJ FORMULARZ</h2>
              <ul className="space-y-4 text-text-body text-[16px]">
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Szybka pożyczka pod nieruchomość
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Nie wymagamy zaświadczeń z ZUS i US
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Nie weryfikujemy naszych klientów w bazach BIK, BIG i KRD czy ERIF
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Nie badamy zdolności kredytowej
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Oferujemy atrakcyjne warunki spłat
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Decyzja kredytowa w 12 godzin
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-circle shrink-0 !w-8 !h-8 !p-1.5 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  Wypłata środków w ekspresowym tempie
                </li>
              </ul>

              <div className="mt-10">
                <h3 className="text-[25px] font-semibold text-primary mb-4">Kontakt tradycyjny</h3>
                <div className="space-y-3">
                  <a href="mailto:kontakt@podhipoteke24.pl" className="flex items-center gap-3 text-text-body hover:text-primary transition-colors">
                    <span className="icon-circle-dark icon-circle shrink-0 !w-9 !h-9">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                    </span>
                    kontakt@podhipoteke24.pl
                  </a>
                  <a href="tel:577873616" className="flex items-center gap-3 text-text-body hover:text-primary transition-colors">
                    <span className="icon-circle-dark icon-circle shrink-0 !w-9 !h-9">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                    </span>
                    577 873 616
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Twoje imię i nazwisko"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Twój numer telefonu"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Twój email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="nip"
                    placeholder="NIP Twojej firmy"
                    value={formData.nip}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <input
                  type="text"
                  name="amount"
                  placeholder="Jaką kwotę chcesz pożyczyć?"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="collateral"
                  placeholder="Jaki rodzaj zabezpieczenia posiadasz? (mieszkanie, dom etc.)"
                  value={formData.collateral}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="purpose"
                  placeholder="Jaki jest cel Twojej pożyczki?"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="period"
                  placeholder="Wskaż okres finansowania (na ile miesięcy chciałbyś pożyczkę?)"
                  value={formData.period}
                  onChange={handleChange}
                  className="form-input"
                />
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-4 h-4 accent-primary"
                  />
                  <span className="text-[10px] text-text-secondary leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności w celu obsługi mojego zapytania.
                  </span>
                </label>
                <button type="submit" className="btn-secondary !px-8 !py-3 w-full sm:w-auto">
                  wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
