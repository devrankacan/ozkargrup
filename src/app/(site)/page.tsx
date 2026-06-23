import Link from "next/link";
import { prisma } from "@/lib/prisma";
import QuickBookingWidget from "@/components/QuickBookingWidget";
import { getSiteSettings } from "@/lib/siteSettings";
import { tours } from "@/lib/tours";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import MagneticButton from "@/components/animations/MagneticButton";
import ThreeHeroBackground from "@/components/animations/ThreeHeroBackground";

export const revalidate = 0;

export default async function HomePage() {
  const settings = await getSiteSettings();
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  const totalCarCount = await prisma.car.count({ where: { isActive: true } });

  const locations = await prisma.location.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const hasHeroImage = Boolean(settings.heroImageDesktopUrl || settings.heroImageMobileUrl);

  return (
    <div>
      <section className="relative overflow-hidden bg-brown-50">
        {!hasHeroImage && <ThreeHeroBackground />}
        {hasHeroImage && (
          <>
            {settings.heroImageMobileUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.heroImageMobileUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover md:hidden"
              />
            )}
            {settings.heroImageDesktopUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.heroImageDesktopUrl}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${settings.heroImageMobileUrl ? "hidden md:block" : ""}`}
              />
            )}
            <div className="absolute inset-0 bg-brown-900/35 backdrop-blur-sm" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5" />
          </>
        )}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <h1
              className={`text-4xl font-bold md:text-5xl ${
                settings.heroImageDesktopUrl || settings.heroImageMobileUrl ? "text-white drop-shadow-md" : "text-brown-700"
              }`}
            >
              Yolculuğunuz İçin Güvenilir Araç Kiralama
            </h1>
            <p
              className={`max-w-xl ${
                settings.heroImageDesktopUrl || settings.heroImageMobileUrl ? "text-white/90 drop-shadow" : "text-brown-600"
              }`}
            >
              Özkar Grup Rent a Car ile geniş araç filomuzdan size en uygun aracı
              kolayca seçin, online rezervasyon yapın ve yolculuğunuza güvenle başlayın.
            </p>
          </div>
          <QuickBookingWidget
            cars={cars.map((c) => ({ id: c.id, brand: c.brand, name: c.name, pricePerDay: c.pricePerDay }))}
            locations={locations.map((l) => ({ id: l.id, name: l.name }))}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Araç", value: totalCarCount || 0, suffix: "+" },
            { label: "Mutlu Müşteri", value: 1200, suffix: "+" },
            { label: "Yıllık Deneyim", value: 8, suffix: "" },
            { label: "Lokasyon", value: locations.length || 0, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-brown-200 bg-white p-6 text-center shadow-sm">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-3xl font-bold text-brown-700" />
              <p className="mt-2 text-sm text-brown-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <AnimatedHeading className="text-2xl font-bold text-brown-700">Öne Çıkan Araçlar</AnimatedHeading>
          <Link href="/araclar" className="text-sm font-medium text-brown-500 hover:text-brown-700">
            Tüm araçları gör →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car, index) => {
            const thumb = car.images[0]?.url || car.imageUrl;
            return (
              <RevealOnScroll key={car.id} index={index}>
                <Link
                  href={`/araclar/${car.id}`}
                  className="block overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex h-40 items-center justify-center overflow-hidden bg-brown-100 text-brown-400">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={`${car.brand} ${car.name}`} className="h-full w-full object-cover" />
                    ) : (
                      <span>{car.brand} {car.name}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brown-700">
                      {car.brand} {car.name}
                    </h3>
                    <p className="text-sm text-brown-500">{car.category}</p>
                    <p className="mt-2 text-lg font-bold text-brown-600">
                      {car.pricePerDay} ₺ <span className="text-sm font-normal">/ gün</span>
                    </p>
                    <span className="mt-3 inline-block w-full rounded-lg bg-brown-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brown-600">
                      Detayları Gör
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
          {cars.length === 0 && (
            <p className="text-brown-500">Henüz araç eklenmemiş.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <AnimatedHeading className="text-2xl font-bold text-brown-700">Turlarımız</AnimatedHeading>
          <Link href="/turlar" className="text-sm font-medium text-brown-500 hover:text-brown-700">
            Tüm turları gör →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour, index) => (
            <RevealOnScroll key={tour.slug} index={index}>
              <Link
                href={`/turlar/${tour.slug}`}
                className="block overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="h-40 w-full overflow-hidden bg-brown-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tour.imageUrl} alt={tour.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brown-700">{tour.name}</h3>
                  <p className="text-sm text-brown-500">{tour.location}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <AnimatedHeading className="mb-8 text-2xl font-bold text-brown-700">Neden Özkar Grup Rent a Car?</AnimatedHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Geniş Araç Filosu", desc: "Her ihtiyaca uygun, bakımlı ve güncel araç seçenekleri." },
            { title: "Şeffaf Fiyatlandırma", desc: "Sürpriz ücret yok, gördüğünüz fiyat ödeyeceğiniz fiyattır." },
            { title: "Hızlı Rezervasyon", desc: "Online formla dakikalar içinde rezervasyon talebi oluşturun." },
            { title: "7/24 Destek", desc: "WhatsApp ve telefon hattımızdan her an yanınızdayız." },
          ].map((item, index) => (
            <RevealOnScroll key={item.title} index={index}>
              <div className="h-full rounded-xl border border-brown-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="font-semibold text-brown-700">{item.title}</h3>
                <p className="mt-2 text-sm text-brown-500">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <AnimatedHeading className="text-2xl font-bold text-brown-700">Sıkça Sorulan Sorular</AnimatedHeading>
          <Link href="/sss" className="text-sm font-medium text-brown-500 hover:text-brown-700">
            Tüm soruları gör →
          </Link>
        </div>
        <div className="space-y-3">
          {[
            {
              q: "Araç kiralamak için kaç yaşında olmam gerekir?",
              a: "Araçlarımızı kiralayabilmek için en az 21 yaşında olmanız ve en az 1 yıllık ehliyet sahibi olmanız gerekmektedir.",
            },
            {
              q: "Depozito alınıyor mu?",
              a: "Evet, araç tesliminde kredi kartından bloke şeklinde bir depozito alınır ve araç hasarsız teslim edildiğinde kaldırılır.",
            },
            {
              q: "Aracı farklı bir şehirde teslim edebilir miyim?",
              a: "Şehirler arası teslim seçeneğimiz mevcuttur, rezervasyon sırasında alış ve iade lokasyonlarını farklı seçebilirsiniz.",
            },
          ].map((item) => (
            <details key={item.q} className="group rounded-xl border border-brown-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-semibold text-brown-700 marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="shrink-0 text-brown-400 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-brown-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {locations.length > 0 && (
        <section className="bg-brown-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedHeading className="mb-2 text-2xl font-bold text-brown-700">Alış / İade Lokasyonlarımız</AnimatedHeading>
            <p className="mb-8 text-sm text-brown-500">
              Aşağıdaki noktalardan aracınızı teslim alabilir, dilediğiniz lokasyona iade edebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-3">
              {locations.map((loc) => (
                <span
                  key={loc.id}
                  className="rounded-full border border-brown-200 bg-white px-4 py-2 text-sm font-medium text-brown-600"
                >
                  {loc.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brown-700">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Kiralama şartlarımızı incelediniz mi?</h2>
            <p className="mt-1 text-sm text-brown-100">
              Ehliyet, depozito, sigorta ve yakıt politikamız hakkında bilgi alın.
            </p>
          </div>
          <MagneticButton>
            <Link
              href="/kiralama-sartlari"
              className="shrink-0 rounded-full bg-white px-6 py-2 font-semibold text-brown-700 transition hover:bg-brown-50"
            >
              Kiralama Şartları
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
