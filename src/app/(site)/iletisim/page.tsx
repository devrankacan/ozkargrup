import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "İletişim | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car ile iletişime geçin: telefon, e-posta ve adres bilgilerimiz.",
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-brown-700">İletişim</h1>
      <div className="mb-10 grid gap-4 text-brown-600 sm:grid-cols-3">
        <div>
          <h3 className="font-semibold text-brown-700">Telefon</h3>
          <p>+90 541 912 14 61</p>
        </div>
        <div>
          <h3 className="font-semibold text-brown-700">E-posta</h3>
          <p>info@ozkargroup.com.tr</p>
        </div>
        <div>
          <h3 className="font-semibold text-brown-700">Adres</h3>
          <p>Konaklar, Aker Sk. no:1, 61000 Ortahisar/Trabzon</p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
