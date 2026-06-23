export type Tour = {
  slug: string;
  name: string;
  location: string;
  summary: string;
  description: string;
  imageUrl: string;
};

export const tours: Tour[] = [
  {
    slug: "uzungol",
    name: "Uzungöl",
    location: "Çaykara, Trabzon",
    summary: "Sis bulutlarının arasından yükselen dağlarla çevrili, doğu Karadeniz'in en bilinen göl manzarası.",
    description:
      "Trabzon'a yaklaşık 99 km uzaklıkta yer alan Uzungöl, yemyeşil ormanlarla çevrili doğal gölü ve etrafındaki yayla evleriyle bölgenin en çok ziyaret edilen doğa noktalarından biridir. Göl kenarında yürüyüş, alabalık tadımı ve fotoğraf çekimi için ideal bir gündüz turu rotasıdır.",
    imageUrl: "/uploads/tours/uzungol.jpg",
  },
  {
    slug: "ayder-yaylasi",
    name: "Ayder Yaylası",
    location: "Çamlıhemşin, Rize",
    summary: "Şifalı kaplıcaları, ahşap yayla evleri ve yemyeşil vadisiyle ünlü doğa cenneti.",
    description:
      "Rize'nin Çamlıhemşin ilçesinde, Kaçkar Dağları'nın eteklerinde yer alan Ayder Yaylası, doğal sıcak su kaplıcaları ve geleneksel ahşap konaklamalarıyla bilinir. Şelaleler, yayla yürüyüşleri ve sis altında kalan yemyeşil manzaralar bu turun öne çıkan duraklarındandır.",
    imageUrl: "/uploads/tours/ayder-yaylasi.jpg",
  },
  {
    slug: "hidirnebi-yaylasi",
    name: "Hıdırnebi Yaylası",
    location: "Maçka, Trabzon",
    summary: "Panoramik manzarası ve yamaç paraşütü olanaklarıyla bilinen yüksek rakımlı yayla.",
    description:
      "Trabzon'un Maçka ilçesine bağlı Hıdırnebi Yaylası, deniz seviyesinden yüksekliği sayesinde sunduğu geniş panoramik manzara ve yamaç paraşütü etkinlikleriyle tanınır. Her yıl düzenlenen yayla şenlikleri ve serin iklimiyle yaz aylarının popüler bir kaçış noktasıdır.",
    imageUrl: "/uploads/tours/hidirnebi-yaylasi.jpg",
  },
  {
    slug: "sumela-manastiri",
    name: "Sümela Manastırı",
    location: "Altındere Vadisi, Maçka, Trabzon",
    summary: "Sarp bir kayalığın içine oyulmuş, bin yılı aşkın tarihi olan ikonik manastır.",
    description:
      "Maçka'ya bağlı Altındere Milli Parkı içinde, dik bir kayalığa inşa edilmiş Sümela Manastırı, Karadeniz bölgesinin en önemli tarihi ve kültürel yapılarından biridir. Manastırın freskleri, vadi manzarası ve çevresindeki doğa yürüyüşü patikaları bu turun başlıca cazibe noktalarıdır.",
    imageUrl: "/uploads/tours/sumela-manastiri.jpg",
  },
];
