export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brown-200 bg-brown-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-brown-600">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">Özkar Grup Rent a Car</h3>
            <p>Güvenilir ve konforlu araç kiralama hizmeti.</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">İletişim</h3>
            <p>Tel: +90 555 000 00 00</p>
            <p>E-posta: info@ozkargrup.com</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-brown-700">Adres</h3>
            <p>Örnek Mahallesi, Örnek Caddesi No:1, Türkiye</p>
          </div>
        </div>
        <p className="mt-8 border-t border-brown-200 pt-4 text-center text-xs text-brown-400">
          © {new Date().getFullYear()} Özkar Grup Rent a Car. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
