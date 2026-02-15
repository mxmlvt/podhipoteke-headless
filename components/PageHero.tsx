import Image from "next/image";
import Link from "next/link";

interface PageHeroProps {
  heading: string;
  text: string;
  buttonText?: string;
  buttonHref?: string;
  bgImage: string;
}

export default function PageHero({ heading, text, buttonText, buttonHref, bgImage }: PageHeroProps) {
  return (
    <section className="relative py-[150px] overflow-hidden">
      <Image
        src={bgImage}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-6">
          {heading}
        </h1>
        <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          {text}
        </p>
        {buttonText && buttonHref && (
          <Link href={buttonHref} className="btn-primary !px-8 !py-3 !text-lg">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
