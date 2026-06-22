import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USER || "admin";
  const password = process.env.SEED_ADMIN_PASS || "admin123";

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.create({ data: { username, password: hashed } });
    console.log(`Admin created: ${username} / ${password}`);
  } else {
    console.log("Admin already exists, skipping.");
  }

  const carCount = await prisma.car.count();
  if (carCount === 0) {
    await prisma.car.createMany({
      data: [
        {
          name: "Egea",
          brand: "Fiat",
          category: "Ekonomik",
          pricePerDay: 950,
          transmission: "Manuel",
          fuelType: "Dizel",
          seats: 5,
          imageUrl: "/cars/egea.jpg",
          description: "Şehir içi ve uzun yol için ekonomik tercih.",
        },
        {
          name: "Clio",
          brand: "Renault",
          category: "Ekonomik",
          pricePerDay: 900,
          transmission: "Manuel",
          fuelType: "Benzin",
          seats: 5,
          imageUrl: "/cars/clio.jpg",
          description: "Konforlu ve yakıt tasarruflu hatchback.",
        },
        {
          name: "Passat",
          brand: "Volkswagen",
          category: "Orta Sınıf",
          pricePerDay: 1450,
          transmission: "Otomatik",
          fuelType: "Dizel",
          seats: 5,
          imageUrl: "/cars/passat.jpg",
          description: "İş seyahatleri için geniş ve konforlu sedan.",
        },
        {
          name: "Sportage",
          brand: "Kia",
          category: "SUV",
          pricePerDay: 1800,
          transmission: "Otomatik",
          fuelType: "Dizel",
          seats: 5,
          imageUrl: "/cars/sportage.jpg",
          description: "Aile ve uzun yol seyahatleri için ideal SUV.",
        },
      ],
    });
    console.log("Sample cars created.");
  }

  const campaignCount = await prisma.campaign.count();
  if (campaignCount === 0) {
    await prisma.campaign.create({
      data: {
        title: "Haftalık Kiralamalarda %15 İndirim",
        description: "7 gün ve üzeri kiralamalarda geçerli kampanyadan yararlanın.",
        discount: "%15",
        isActive: true,
      },
    });
    console.log("Sample campaign created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
