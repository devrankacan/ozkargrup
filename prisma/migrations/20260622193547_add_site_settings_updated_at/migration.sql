-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "logoUrl" TEXT,
    "heroImageDesktopUrl" TEXT,
    "heroImageMobileUrl" TEXT,
    "faviconUrl" TEXT,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("faviconUrl", "heroImageDesktopUrl", "heroImageMobileUrl", "id", "logoUrl", "updatedAt") SELECT "faviconUrl", "heroImageDesktopUrl", "heroImageMobileUrl", "id", "logoUrl", "updatedAt" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
