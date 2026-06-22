const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cars = [
  {
    file: "SnapInsta.to_708979776_18532692169078106_1078491714685748360_n.jpg",
    brand: "Citroën",
    name: "C3 Aircross",
    category: "SUV",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.2 PureTech benzinli motor, ABS/ESP/Yokuş Kalkış Desteği, 10.25\" multimedya ekranı, geri görüş kamerası ve park sensörü, 410 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_710176659_18532684096078106_6725352354440320739_n.jpg",
    brand: "Peugeot",
    name: "5008",
    category: "SUV",
    seats: 7,
    fuelType: "Dizel",
    description: "1.5 BlueHDi dizel motor, 7 kişilik geniş kapasite, Apple CarPlay & Android Auto, 360° çevre görüş kamerası, 780 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_711466542_18532685158078106_904703752934186568_n.jpg",
    brand: "Fiat",
    name: "Fiorino",
    category: "Ticari",
    seats: 5,
    fuelType: "Dizel",
    description: "1.3 Multijet dizel motor, geri görüş kamerası ve park sensörü, Bluetooth & USB bağlantısı, 340 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_711709479_18532685218078106_5757137283013551875_n.jpg",
    brand: "Dacia",
    name: "Jogger",
    category: "SUV",
    seats: 7,
    fuelType: "Benzinli",
    description: "1.0 TCe benzinli motor, 7 kişilik geniş aile aracı, Apple CarPlay & Android Auto, 708 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_712307597_18532692118078106_3345566470455965079_n.jpg",
    brand: "Fiat",
    name: "Egea",
    category: "Sedan",
    seats: 5,
    fuelType: "Dizel",
    description: "1.6 MultiJet dizel motor, 10.25\" dokunmatik ekran, geri görüş kamerası ve park sensörü, 520 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_708918778_18532683736078106_5705442946564537482_n.jpg",
    brand: "Kia",
    name: "Sportage",
    category: "SUV",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.6 T-GDi benzinli motor, 360° çevre görüş kamerası, çift bölgeli klima, 591 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_710461415_18532679908078106_8141648188036170134_n.jpg",
    brand: "Renault",
    name: "Clio",
    category: "Hatchback",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.0 TCe benzinli motor, şerit takip asistanı, geri görüş kamerası, 300 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_711135956_18532680550078106_7371736538885444912_n.jpg",
    brand: "Dacia",
    name: "Duster",
    category: "SUV",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.0 TCe benzinli / 1.5 Blue dCi dizel motor seçenekleri, SUV ve off-road yeteneği, 478 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_711588539_18532683760078106_7157985525284427700_n.jpg",
    brand: "Citroën",
    name: "Berlingo",
    category: "Minivan",
    seats: 6,
    fuelType: "Dizel",
    description: "1.5 BlueHDi dizel motor, 5+1 kişilik geniş kapasite, park sensörü ve geri görüş kamerası, 675 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_712469302_18532683682078106_7653237046707818910_n.jpg",
    brand: "Dacia",
    name: "Stepway",
    category: "Hatchback",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.0 TCe benzinli motor, geri görüş kamerası ve park sensörü, 410 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_709206113_18532677784078106_5337179476337001695_n.jpg",
    brand: "Volkswagen",
    name: "Golf",
    category: "Hatchback",
    seats: 5,
    fuelType: "Benzinli",
    description: "Dijital gösterge paneli, adaptif hız sabitleyici, Apple CarPlay & Android Auto, otomatik vites konforu.",
  },
  {
    file: "SnapInsta.to_709821529_18532678978078106_6685514741192782787_n.jpg",
    brand: "Renault",
    name: "Taliant",
    category: "Sedan",
    seats: 5,
    fuelType: "Benzinli",
    description: "1.0 Turbo benzinli motor, hız sabitleyici, geri görüş kamerası, 510 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_710849015_18532678084078106_6728595144229900178_n.jpg",
    brand: "Skoda",
    name: "Octavia",
    category: "Sedan",
    seats: 5,
    fuelType: "Benzinli",
    description: "Çarpışma önleme, şerit takip asistanı, yokuş kalkış desteği, çift bölgeli klima, 600 litre bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_712196841_18532677859078106_2813859175308153529_n.jpg",
    brand: "Opel",
    name: "Zafira Münibüs",
    category: "Minivan",
    seats: 9,
    fuelType: "Dizel",
    description: "8+1 kişilik geniş kapasite, güçlü dizel performans, arka klima çıkışları, geniş bagaj hacmi.",
  },
  {
    file: "SnapInsta.to_712287669_18532677181078106_2395106854752089663_n.jpg",
    brand: "Ford",
    name: "Kuga",
    category: "SUV",
    seats: 5,
    fuelType: "Dizel/Benzin",
    description: "Dizel ve benzin motor seçenekleri, çarpışma önleme, şerit takip asistanı, Apple CarPlay & Android Auto.",
  },
  {
    file: "SnapInsta.to_711885902_18532676983078106_7452564301839187098_n.jpg",
    brand: "Chery",
    name: "Tiggo",
    category: "SUV",
    seats: 5,
    fuelType: "Benzinli",
    description: "Modern ve şık tasarım, dijital kokpit, 6 hava yastığı, geri görüş kamerası ve park sensörü.",
  },
];

async function main() {
  await prisma.reservation.deleteMany({});
  await prisma.carImage.deleteMany({});
  await prisma.car.deleteMany({});

  for (const c of cars) {
    const url = `/uploads/cars/${c.file}`;
    const car = await prisma.car.create({
      data: {
        name: c.name,
        brand: c.brand,
        category: c.category,
        pricePerDay: 0,
        transmission: "",
        fuelType: c.fuelType,
        seats: c.seats,
        imageUrl: url,
        description: c.description,
        isActive: true,
      },
    });
    await prisma.carImage.create({
      data: { carId: car.id, url, order: 0 },
    });
    console.log("created", c.brand, c.name);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
