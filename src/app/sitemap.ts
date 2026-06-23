import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";
import { tours } from "@/lib/tours";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    select: { id: true, createdAt: true },
  });

  const staticRoutes = [
    "",
    "/araclar",
    "/turlar",
    "/kampanyalar",
    "/hakkimizda",
    "/sss",
    "/kiralama-sartlari",
    "/iletisim",
    "/rezervasyon",
    "/musaitlik",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const carRoutes = cars.map((car) => ({
    url: `${SITE_URL}/araclar/${car.id}`,
    lastModified: car.createdAt,
  }));

  const tourRoutes = tours.map((tour) => ({
    url: `${SITE_URL}/turlar/${tour.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...carRoutes, ...tourRoutes];
}
