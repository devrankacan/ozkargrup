-- CreateTable
CREATE TABLE "TourEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourSlug" TEXT NOT NULL,
    "tourName" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Backfill: create one TourEvent per distinct (tourSlug, tourDate) found in existing reservations
INSERT INTO "TourEvent" ("id", "tourSlug", "tourName", "eventDate", "createdAt")
SELECT
  lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(4))),
  "tourSlug",
  "tourName",
  "tourDate",
  CURRENT_TIMESTAMP
FROM (SELECT DISTINCT "tourSlug", "tourName", "tourDate" FROM "TourReservation");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TourReservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "peopleCount" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TourReservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "TourEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TourReservation" ("id", "eventId", "fullName", "email", "phone", "peopleCount", "notes", "status", "createdAt")
SELECT
  tr."id",
  (SELECT te."id" FROM "TourEvent" te WHERE te."tourSlug" = tr."tourSlug" AND te."eventDate" = tr."tourDate" LIMIT 1),
  tr."fullName",
  tr."email",
  tr."phone",
  tr."peopleCount",
  tr."notes",
  tr."status",
  tr."createdAt"
FROM "TourReservation" tr;
DROP TABLE "TourReservation";
ALTER TABLE "new_TourReservation" RENAME TO "TourReservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
