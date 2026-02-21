import Link from "next/link";
import { Building2, Landmark, Home, Trees, RefreshCcw, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Landmark,
    title: "Kredyt hipoteczny",
    desc: "Ekspresowy kredyt hipoteczny na zakup lub refinansowanie nieruchomości. Bez zbędnych formalności.",
    href: "/kredyt-hipoteczny",
  },
  {
    icon: Building2,
    title: "Kredyt pod zastaw mieszkania",
    desc: "Potrzebujesz środków, a posiadasz mieszkanie? Udzielimy kredytu pod jego zastaw w 24 godziny.",
    href: "/kredyt-pod-zastaw-mieszkania",
  },
  {
    icon: Home,
    title: "Pożyczki pod zastaw nieruchomości",
    desc: "Nieruchomość to jedyne zabezpieczenie, którego wymagamy. Bez BIK, bez zaświadczeń z ZUS.",
    href: "/pozyczki-pod-zastaw-nieruchomosci",
  },
  {
    icon: Home,
    title: "Pożyczki pod zastaw domu",
    desc: "Dom jednorodzinny, kamienica lub willa – każda nieruchomość może być zabezpieczeniem pożyczki.",
    href: "/pozyczki-pod-zastaw-domu",
  },
  {
    icon: Trees,
    title: "Pożyczki pod zastaw działki",
    desc: "Posiadasz działkę budowlaną lub rolną? Możemy udzielić pożyczki pod jej zastaw.",
    href: "/pozyczki-pod-zastaw-dzialki",
  },
  {
    icon: RefreshCcw,
    title: "Pożyczki oddłużeniowe",
    desc: "Spłacimy Twoje zobowiązania komornicze, hipoteki i długi. Wyjdź z pętli zadłużenia.",
    href: "/pozyczki-oddluzeniowe",
  },
];

export default function OurOffer() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Nasza oferta
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Ekspresowe pożyczki pod hipotekę od 50 000 do 2 000 000 zł. Bez BIK. Bez zaświadczeń.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="group">
              <Card className="h-full border border-[#e5e7eb] hover:border-[#2299AA] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="p-3 rounded-xl bg-[#f7f8fa] group-hover:bg-[#e8f4f6] w-fit transition-colors">
                    <service.icon className="w-7 h-7 text-[#2299AA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-2 group-hover:text-[#1c435e] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#2299AA] text-sm font-semibold group-hover:gap-2 transition-all">
                    Dowiedz się więcej →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
