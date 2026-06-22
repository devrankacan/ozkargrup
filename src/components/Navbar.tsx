import Link from "next/link";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/araclar", label: "Araçlar" },
  { href: "/kampanyalar", label: "Kampanyalar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  return (
    <header className="border-b border-brown-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-brown-700">
          Özkar Grup <span className="text-brown-400">Rent a Car</span>
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
        <Link
          href="/rezervasyon"
          className="rounded-full bg-brown-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brown-600"
        >
          Rezervasyon Yap
        </Link>
      </div>
    </header>
  );
}
