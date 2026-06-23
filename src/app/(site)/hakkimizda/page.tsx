import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import MagneticButton from "@/components/animations/MagneticButton";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Hakkımızda | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car hakkında: misyonumuz, vizyonumuz ve neden bizi seçmelisiniz.",
};

const values = [
  {
    title: "Geniş ve Bakımlı Filo",
    desc: "Düzenli bakımdan geçen, güncel model araçlarla yola çıkın.",
    icon: (
      <path d="M3 13l1.6-4.8A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.2L21 13v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Zm3.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "Şeffaf Fiyatlandırma",
    desc: "Sürpriz ücret yok, gördüğünüz fiyat ödeyeceğiniz fiyattır.",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14.93v.07a1 1 0 0 1-2 0v-.09a3.64 3.64 0 0 1-2.4-1.61 1 1 0 0 1 1.69-1.06A1.77 1.77 0 0 0 12 15c.83 0 1.5-.47 1.5-1s-.46-.86-1.74-1.21C10.18 12.39 9 11.71 9 10c0-1.34 1-2.41 2.4-2.7a1 1 0 0 1 .1-.86 1 1 0 0 1 1 .92v.09a3.4 3.4 0 0 1 2.16 1.4 1 1 0 0 1-1.64 1.15A1.6 1.6 0 0 0 12 9c-.78 0-1.4.42-1.4.93 0 .56.6.83 1.85 1.18 1.45.4 2.65 1.04 2.65 2.79 0 1.31-1 2.4-2.5 2.74Z" />
    ),
  },
  {
    title: "Hızlı Rezervasyon",
    desc: "Online formla dakikalar içinde rezervasyon talebi oluşturun.",
    icon: (
      <path d="M19 4h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 15H5V10h14Zm0-11H5V6h14Zm-7 4.5h2v2h-2Zm-4 0h2v2H8Zm8 0h2v2h-2Z" />
    ),
  },
  {
    title: "7/24 Destek",
    desc: "WhatsApp ve telefon hattımızdan her an yanınızdayız.",
    icon: (
      <path d="M12 2a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H6.06A7 7 0 0 1 19.94 12H18a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1 3.5 3.5 0 0 1-3.5 1.5h-1a1 1 0 1 0 0 2h1A5.5 5.5 0 0 0 20 16v-5a9 9 0 0 0-8-9Z" />
    ),
  },
];

export default async function HakkimizdaPage() {
  const totalCarCount = await prisma.car.count({ where: { isActive: true } });
  const locationCount = await prisma.location.count({ where: { isActive: true } });

  return (
    <div>
      <section className="bg-brown-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <AnimatedHeading as="h1" className="text-3xl font-bold text-brown-700 md:text-4xl">
            Trabzon&apos;da Güvenilir Araç Kiralama Deneyimi
          </AnimatedHeading>
          <p className="mx-auto mt-4 max-w-2xl text-brown-600">
            Özkar Grup Rent a Car, müşterilerine güvenilir, konforlu ve ekonomik araç kiralama
            hizmeti sunmak amacıyla kurulmuştur. Geniş araç filomuz ve deneyimli ekibimizle, şehir
            içi kısa süreli kiralamalardan uzun süreli kurumsal kiralamalara kadar her ihtiyaca
            uygun çözümler üretiyoruz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { label: "Araç", value: totalCarCount || 0, suffix: "+" },
            { label: "Mutlu Müşteri", value: 1200, suffix: "+" },
            { label: "Yıllık Deneyim", value: 8, suffix: "" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-brown-200 bg-white p-6 text-center shadow-sm">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-3xl font-bold text-brown-700" />
              <p className="mt-2 text-sm text-brown-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <RevealOnScroll index={0}>
            <div className="h-full rounded-xl border border-brown-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-brown-700">Misyonumuz</h2>
              <p className="mt-3 text-brown-600">
                Müşterilerimize en uygun fiyatlarla en kaliteli aracı sunarak, seyahatlerini güvenli
                ve konforlu hale getirmek; her yolculukta yanlarında olmak.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll index={1}>
            <div className="h-full rounded-xl border border-brown-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-brown-700">Vizyonumuz</h2>
              <p className="mt-3 text-brown-600">
                Trabzon ve çevresinde araç kiralama sektöründe; şeffaflığı, güveni ve müşteri
                memnuniyetini ön planda tutan, tercih edilen ilk marka olmak.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-brown-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <AnimatedHeading className="mb-8 text-center text-2xl font-bold text-brown-700">
            Neden Özkar Grup Rent a Car?
          </AnimatedHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => (
              <RevealOnScroll key={item.title} index={index}>
                <div className="h-full rounded-xl border border-brown-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <svg viewBox="0 0 24 24" className="h-9 w-9 fill-brown-500">
                    {item.icon}
                  </svg>
                  <h3 className="mt-4 font-semibold text-brown-700">{item.title}</h3>
                  <p className="mt-2 text-sm text-brown-500">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <RevealOnScroll index={0}>
            <div className="h-full rounded-xl border border-brown-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-brown-700">{locationCount || 0}+</p>
              <p className="mt-2 text-sm text-brown-500">Alış / İade Lokasyonu</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll index={1}>
            <div className="h-full rounded-xl border border-brown-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-brown-700">TÜRSAB</p>
              <p className="mt-2 text-sm text-brown-500">Belgeli, Güvenilir İşletme</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-brown-700">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Aracınızı şimdi rezerve edin</h2>
            <p className="mt-1 text-sm text-brown-100">Online formla dakikalar içinde rezervasyon talebi oluşturun.</p>
          </div>
          <MagneticButton>
            <Link
              href="/rezervasyon"
              className="shrink-0 rounded-full bg-white px-6 py-2 font-semibold text-brown-700 transition hover:bg-brown-50"
            >
              Rezervasyon Yap
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
