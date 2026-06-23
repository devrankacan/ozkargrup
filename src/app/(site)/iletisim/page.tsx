import type { Metadata } from "next";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "İletişim | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car ile iletişime geçin: telefon, e-posta ve adres bilgilerimiz.",
};

const contactItems = [
  {
    title: "Telefon / WhatsApp",
    value: "+90 541 912 14 61",
    href: "tel:+905419121461",
    icon: (
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z" />
    ),
  },
  {
    title: "E-posta",
    value: "info@ozkargroup.com.tr",
    href: "mailto:info@ozkargroup.com.tr",
    icon: (
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2-8 5-8-5Zm0 12H4V8l8 5 8-5Z" />
    ),
  },
  {
    title: "Adres",
    value: "Konaklar, Aker Sk. no:1, 61000 Ortahisar/Trabzon",
    href: "https://maps.google.com/?q=Konaklar+Aker+Sk+no:1+Ortahisar+Trabzon",
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    ),
  },
  {
    title: "Çalışma Saatleri",
    value: "Her gün 08:00 - 22:00",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.41 4 2.32-.75 1.27L11 13V7h2Z" />
    ),
  },
];

export default function IletisimPage() {
  return (
    <div>
      <section className="bg-brown-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <AnimatedHeading as="h1" className="text-3xl font-bold text-brown-700 md:text-4xl">
            Bize Ulaşın
          </AnimatedHeading>
          <p className="mx-auto mt-4 max-w-2xl text-brown-600">
            Sorularınız, rezervasyon talepleriniz veya kurumsal kiralama ihtiyaçlarınız için
            telefon, WhatsApp veya aşağıdaki formu kullanarak bize her zaman ulaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item, index) => {
            const content = (
              <div className="h-full rounded-xl border border-brown-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <svg viewBox="0 0 24 24" className="h-9 w-9 fill-brown-500">
                  {item.icon}
                </svg>
                <h3 className="mt-4 font-semibold text-brown-700">{item.title}</h3>
                <p className="mt-2 text-sm text-brown-500">{item.value}</p>
              </div>
            );
            return (
              <RevealOnScroll key={item.title} index={index}>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <RevealOnScroll index={0}>
            <div className="h-full rounded-xl border border-brown-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-4 text-xl font-semibold text-brown-700">Mesaj Gönderin</h2>
              <ContactForm />
            </div>
          </RevealOnScroll>
          <RevealOnScroll index={1}>
            <div className="h-full overflow-hidden rounded-xl border border-brown-200 shadow-sm">
              <iframe
                title="Özkar Grup Rent a Car Konum"
                src="https://maps.google.com/maps?q=Konaklar,%20Aker%20Sk.%20no:1,%2061000%20Ortahisar/Trabzon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
