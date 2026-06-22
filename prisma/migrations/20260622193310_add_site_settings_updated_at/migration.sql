/*
  Warnings:

  - Added the required column `updatedAt` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "logoUrl" TEXT,
    "heroImageDesktopUrl" TEXT,
    "heroImageMobileUrl" TEXT,
    "faviconUrl" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SiteSettings" ("faviconUrl", "heroImageDesktopUrl", "heroImageMobileUrl", "id", "logoUrl") SELECT "faviconUrl", "heroImageDesktopUrl", "heroImageMobileUrl", "id", "logoUrl" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
