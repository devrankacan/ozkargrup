import ContactForm from "@/components/ContactForm";

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-brown-700">İletişim</h1>
      <div className="mb-10 grid gap-4 text-brown-600 sm:grid-cols-3">
        <div>
          <h3 className="font-semibold text-brown-700">Telefon</h3>
          <p>+90 555 000 00 00</p>
        </div>
        <div>
          <h3 className="font-semibold text-brown-700">E-posta</h3>
          <p>info@ozkargrup.com</p>
        </div>
        <div>
          <h3 className="font-semibold text-brown-700">Adres</h3>
          <p>Örnek Mahallesi, Örnek Caddesi No:1</p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
