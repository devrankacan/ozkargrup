import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brown-400">404</p>
      <h1 className="mt-2 text-3xl font-bold text-brown-700">Sayfa Bulunamadı</h1>
      <p className="mt-4 text-brown-500">
        Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-brown-500 px-6 py-2 font-semibold text-white transition hover:bg-brown-600"
        >
          Anasayfaya Dön
        </Link>
        <Link
          href="/araclar"
          className="rounded-full border border-brown-300 px-6 py-2 font-semibold text-brown-600 transition hover:bg-brown-100"
        >
          Araçları Gör
        </Link>
      </div>
    </div>
  );
}
