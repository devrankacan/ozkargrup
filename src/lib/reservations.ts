import { prisma } from "@/lib/prisma";

export async function findOverlappingReservation(
  carId: string,
  startDate: Date,
  endDate: Date,
  excludeId?: string
) {
  return prisma.reservation.findFirst({
    where: {
      carId,
      status: { not: "cancelled" },
      startDate: { lt: endDate },
      endDate: { gt: startDate },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });
}
