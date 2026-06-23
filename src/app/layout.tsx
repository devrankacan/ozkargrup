import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { getSiteSettings } from "@/lib/siteSettings";
import GradientBackground from "@/components/animations/GradientBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Özkar Grup Rent a Car",
      template: "%s",
    },
    description: "Güvenilir ve konforlu araç kiralama hizmeti. Geniş araç filomuzdan size en uygun aracı seçin, online rezervasyon yapın.",
    icons: settings.faviconUrl
      ? { icon: `${settings.faviconUrl}?v=${settings.updatedAt.getTime()}` }
      : undefined,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Özkar Grup Rent a Car",
      title: "Özkar Grup Rent a Car",
      description: "Güvenilir ve konforlu araç kiralama hizmeti.",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
