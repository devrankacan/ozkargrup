import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";
import MobileMenu from "@/components/MobileMenu";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/araclar", label: "Araçlar" },
  { href: "/turlar", label: "Turlar" },
  { href: "/kampanyalar", label: "Kampanyalar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default async function Navbar() {
  const settings = await getSiteSettings();

  return (
    <header className="relative border-b border-brown-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brown-700">
          {settings.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logoUrl} alt="Özkar Grup Rent a Car" className="h-10 w-auto object-contain" />
          ) : (
            <span>
              Özkar Grup <span className="text-brown-400">Rent a Car</span>
            </span>
          )}
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brown-600 transition hover:text-brown-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/rezervasyon"
            className="whitespace-nowrap rounded-full bg-brown-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brown-600 sm:px-5 sm:text-sm"
          >
            Rezervasyon Yap
          </Link>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
