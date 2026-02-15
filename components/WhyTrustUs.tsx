import Image from "next/image";

export default function WhyTrustUs() {
  return (
    <section className="relative py-[150px] overflow-hidden">
      <Image
        src="/images/happy-couple.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[rgba(38,38,38,0.44)]" />
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-[4.2rem] font-semibold text-white leading-tight mb-6">
          Dlaczego warto nam zaufać?
        </h2>
        <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Jesteśmy firmą która spełnia oczekiwania swoich klientów. Działamy szybko i rzetelnie.
        </p>
      </div>
    </section>
  );
}
