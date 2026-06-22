import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Özkar Grup Rent a Car",
  description: "Araç kiralama süreciyle ilgili en sık sorulan sorular: ehliyet, yaş sınırı, depozito, yakıt politikası, ek sürücü ve daha fazlası.",
};

const faqs = [
  {
    question: "Araç kiralamak için kaç yaşında olmam gerekir?",
    answer: "Araçlarımızı kiralayabilmek için en az 21 yaşında olmanız ve en az 1 yıllık ehliyet sahibi olmanız gerekmektedir. Bazı araç gruplarında yaş sınırı 25'e çıkabilir.",
  },
  {
    question: "Kiralama için hangi belgeler gerekiyor?",
    answer: "Geçerli bir sürücü belgesi (ehliyet) ve nüfus cüzdanı veya pasaport ile kiralama yapabilirsiniz. Yabancı misafirlerimiz için uluslararası ehliyet veya pasaport yeterlidir.",
  },
  {
    question: "Depozito alınıyor mu?",
    answer: "Evet, araç tesliminde kredi kartından bloke şeklinde bir depozito alınır. Araç hasarsız ve eksiksiz teslim edildiğinde depozito bloke süresi sonunda otomatik olarak kaldırılır.",
  },
  {
    question: "Yakıt politikası nasıl işliyor?",
    answer: "Araçlar \"dolu teslim, dolu teslim al\" politikasıyla verilir. Aracı teslim aldığınız doluluk seviyesinde iade etmeniz beklenir.",
  },
  {
    question: "Ek sürücü ekleyebilir miyim?",
    answer: "Evet, ek sürücü eklemek mümkündür. Ek sürücünün de geçerli bir ehliyete sahip olması ve kiralama sırasında belgelerinin ibraz edilmesi gerekir.",
  },
  {
    question: "Kilometre sınırı var mı?",
    answer: "Standart kiralamalarımızda günlük kilometre sınırı bulunmamaktadır. Uzun süreli ve kurumsal kiralamalarda farklı koşullar uygulanabilir, detaylar için bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "Aracı farklı bir şehirde teslim edebilir miyim?",
    answer: "Şehirler arası teslim seçeneğimiz mevcuttur. Rezervasyon sırasında alış ve iade lokasyonlarını farklı seçerek bu hizmetten yararlanabilirsiniz.",
  },
  {
    question: "Rezervasyonumu nasıl iptal edebilirim veya değiştirebilirim?",
    answer: "Rezervasyon iptali veya değişikliği için WhatsApp veya telefon hattımızdan bizimle iletişime geçmeniz yeterlidir. İptal koşulları rezervasyon tarihine göre değişiklik gösterebilir.",
  },
  {
    question: "Kasko/sigorta kapsamı nedir?",
    answer: "Tüm araçlarımız zorunlu trafik sigortası ve kasko ile teslim edilir. Kapsam dışı kalan hasar durumları için teslim sırasında bilgilendirme yapılır.",
  },
];

export default function SssPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-brown-700">Sıkça Sorulan Sorular</h1>
      <p className="mb-8 text-brown-500">
        Araç kiralama sürecinizle ilgili en sık sorulan soruları sizin için derledik.
        Aradığınız cevabı bulamazsanız bizimle iletişime geçebilirsiniz.
      </p>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-brown-200 bg-white p-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-brown-700 marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {faq.question}
                <span className="shrink-0 text-brown-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-brown-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
