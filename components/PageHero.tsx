import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  heading: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  bgImage: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHero({
  heading,
  text,
  buttonText,
  buttonHref,
  bgImage,
  subtitle,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[280px] md:min-h-[360px] flex items-center overflow-hidden">
      <Image
        src={bgImage}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#152f45]/85 via-[#1c435e]/75 to-[#1c435e]/60" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full py-12">
        {/* Breadcrumbs above heading */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/40">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {subtitle && (
          <p className="text-[#2299AA] font-semibold text-sm uppercase tracking-wider mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
          {heading}
        </h1>
        {text && (
          <p className="text-white/85 text-lg max-w-2xl leading-relaxed mb-6">
            {text}
          </p>
        )}
        {buttonText && buttonHref && (
          <Link href={buttonHref} className="btn-cta-shine !px-8 !py-4">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
