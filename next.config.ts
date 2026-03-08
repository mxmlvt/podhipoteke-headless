import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "srv106163.seohost.com.pl",
      },
      {
        protocol: "https",
        hostname: "podhipoteke24.pl",
      },
      {
        protocol: "https",
        hostname: "www.podhipoteke24.pl",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    // 301: stare URL-e /pozyczki-[miasto] → nowe /pozyczki-pod-zastaw-[miasto]
    const cityRedirects = [
      ["pozyczki-warszawa",         "pozyczki-pod-zastaw-warszawa"],
      ["pozyczki-krakow",           "pozyczki-pod-zastaw-krakow"],
      ["pozyczki-wroclaw",          "pozyczki-pod-zastaw-wroclaw"],
      ["pozyczki-lodz",             "pozyczki-pod-zastaw-lodz"],
      ["pozyczki-poznan",           "pozyczki-pod-zastaw-poznan"],
      ["pozyczki-gdansk",           "pozyczki-pod-zastaw-gdansk"],
      ["pozyczki-gdynia",           "pozyczki-pod-zastaw-gdynia"],
      ["pozyczki-szczecin",         "pozyczki-pod-zastaw-szczecin"],
      ["pozyczki-bydgoszcz",        "pozyczki-pod-zastaw-bydgoszcz"],
      ["pozyczki-lublin",           "pozyczki-pod-zastaw-lublin"],
      ["pozyczki-katowice",         "pozyczki-pod-zastaw-katowice"],
      ["pozyczki-bialystok",        "pozyczki-pod-zastaw-bialystok"],
      ["pozyczki-czestochowa",      "pozyczki-pod-zastaw-czestochowa"],
      ["pozyczki-radom",            "pozyczki-pod-zastaw-radom"],
      ["pozyczki-torun",            "pozyczki-pod-zastaw-torun"],
      ["pozyczki-sosnowiec",        "pozyczki-pod-zastaw-sosnowiec"],
      ["pozyczki-rzeszow",          "pozyczki-pod-zastaw-rzeszow"],
      ["pozyczki-kielce",           "pozyczki-pod-zastaw-kielce"],
      ["pozyczki-gliwice",          "pozyczki-pod-zastaw-gliwice"],
      ["pozyczki-zabrze",           "pozyczki-pod-zastaw-zabrze"],
      ["pozyczki-olsztyn",          "pozyczki-pod-zastaw-olsztyn"],
      ["pozyczki-bielsko-biala",    "pozyczki-pod-zastaw-bielsko-biala"],
      ["pozyczki-bytom",            "pozyczki-pod-zastaw-bytom"],
      ["pozyczki-zielona-gora",     "pozyczki-pod-zastaw-zielona-gora"],
      ["pozyczki-rybnik",           "pozyczki-pod-zastaw-rybnik"],
      ["pozyczki-opole",            "pozyczki-pod-zastaw-opole"],
      ["pozyczki-tychy",            "pozyczki-pod-zastaw-tychy"],
      ["pozyczki-elblag",           "pozyczki-pod-zastaw-elblag"],
      ["pozyczki-nowy-sacz",        "pozyczki-pod-zastaw-nowy-sacz"],
      ["pozyczki-koszalin",         "pozyczki-pod-zastaw-koszalin"],
      ["pozyczki-kalisz",           "pozyczki-pod-zastaw-kalisz"],
      ["pozyczki-konin",            "pozyczki-pod-zastaw-konin"],
      ["pozyczki-suwalki",          "pozyczki-pod-zastaw-suwalki"],
      ["pozyczki-legnica",          "pozyczki-pod-zastaw-legnica"],
      ["pozyczki-inowroclaw",       "pozyczki-pod-zastaw-inowroclaw"],
      ["pozyczki-pila",             "pozyczki-pod-zastaw-pila"],
      ["pozyczki-dabrowa-gornicza", "pozyczki-pod-zastaw-dabrowa-gornicza"],
    ].map(([source, destination]) => ({
      source: `/${source}`,
      destination: `/${destination}`,
      permanent: true,
    }));

    return [
      {
        source: "/pozyczki-oddluzeniowe",
        destination: "/pozyczki-oddluzeniowe-2",
        permanent: true,
      },
      ...cityRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
