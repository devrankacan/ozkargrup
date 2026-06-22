import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiralama Şartları | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car kiralama şartları: ehliyet, yaş sınırı, depozito, sigorta, yakıt politikası, gecikme ve iade kuralları.",
};

export default function KiralamaSartlariPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-brown-700">Kiralama Şartları</h1>
      <div className="space-y-8 text-brown-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">1. Sürücü Şartları</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Kiracı en az 21 yaşında olmalı ve en az 1 yıllık geçerli sürücü belgesine sahip olmalıdır.</li>
            <li>Bazı araç gruplarında yaş sınırı 25 olabilir, rezervasyon öncesi teyit edilmesi önerilir.</li>
            <li>Kiralama sırasında geçerli ehliyet ve kimlik/pasaport ibrazı zorunludur.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">2. Depozito</h2>
          <p>
            Araç teslimi sırasında kredi kartından bloke şeklinde bir depozito alınır. Araç hasarsız,
            eksiksiz ve sözleşmede belirtilen koşullarda iade edildiğinde depozito bloke süresi sonunda
            otomatik olarak kaldırılır.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">3. Yakıt Politikası</h2>
          <p>
            Araçlar &quot;dolu teslim, dolu teslim al&quot; politikasıyla verilir. Aracın teslim alındığı
            doluluk seviyesinin altında iade edilmesi durumunda eksik yakıt bedeli ve hizmet ücreti
            kiracıdan tahsil edilir.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">4. Sigorta ve Kasko</h2>
          <p>
            Tüm araçlarımız zorunlu trafik sigortası ve kasko ile teslim edilir. Kusurlu sürüş, alkollü/
            uyuşturucu etkisinde araç kullanımı veya sözleşme dışı kullanım kaynaklı hasarlar sigorta
            kapsamı dışındadır ve kiracıya fatura edilir.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">5. Ek Sürücü</h2>
          <p>
            Sözleşmeye ek sürücü eklenebilir. Ek sürücünün de geçerli ehliyet ve kimlik belgesi ile
            teslim sırasında hazır bulunması gerekir.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">6. Gecikme ve İade</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Araç, sözleşmede belirtilen tarih ve saatte, belirtilen lokasyonda iade edilmelidir.</li>
            <li>Gecikmeli iadelerde her saat için ek ücret, 3 saati aşan gecikmelerde tam günlük ücret uygulanır.</li>
            <li>İade lokasyonunun değişmesi durumunda ek hizmet bedeli talep edilebilir.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-brown-700">7. İptal ve Değişiklik</h2>
          <p>
            Rezervasyon iptal ve değişiklik talepleri WhatsApp veya telefon hattımız üzerinden iletilmelidir.
            İptal koşulları, rezervasyon tarihine olan yakınlığa göre değişiklik gösterebilir.
          </p>
        </section>

        <p className="text-sm text-brown-400">
          Bu sayfada yer alan şartlar genel bilgilendirme amaçlıdır; güncel ve nihai koşullar kiralama
          sözleşmesinde belirtilir.
        </p>
      </div>
    </div>
  );
}
