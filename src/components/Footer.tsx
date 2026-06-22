import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";
import NewsletterForm from "@/components/NewsletterForm";

const pageLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/araclar", label: "Araçlar" },
  { href: "/kampanyalar", label: "Kampanyalar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sss", label: "Sıkça Sorulan Sorular" },
  { href: "/kiralama-sartlari", label: "Kiralama Şartları" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/rezervasyon", label: "Rezervasyon Yap" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-16 border-t border-brown-200 bg-brown-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-brown-600">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            {settings.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logoUrl} alt="Özkar Grup Rent a Car" className="mb-3 h-20 w-auto object-contain" />
            ) : (
              <h3 className="mb-2 font-semibold text-brown-700">Özkar Grup Rent a Car</h3>
            )}
            <p>Güvenilir ve konforlu araç kiralama hizmeti.</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">Sayfalar</h3>
            <ul className="space-y-1">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-brown-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">İletişim</h3>
            <p>Tel: +90 555 000 00 00</p>
            <p>E-posta: info@ozkargrup.com</p>
            <p className="mt-2">Örnek Mahallesi, Örnek Caddesi No:1, Türkiye</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">Bülten</h3>
            <p className="mb-3">Kampanya ve fırsatlardan haberdar olmak için e-posta listemize katılın.</p>
            <NewsletterForm />
          </div>
        </div>
        <p className="mt-8 border-t border-brown-200 pt-4 text-center text-xs text-brown-400">
          © {new Date().getFullYear()} Özkar Grup Rent a Car. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
