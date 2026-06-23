-- CreateTable
CREATE TABLE "TourReservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourSlug" TEXT NOT NULL,
    "tourName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "peopleCount" INTEGER NOT NULL DEFAULT 1,
    "tourDate" DATETIME NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
