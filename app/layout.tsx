import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ক্ষ্যাপা — তোমার বাংলা ভয়েস AI বন্ধু",
  description: "বাংলা ভয়েস কমান্ডে চলা ফ্রি AI assistant — স্মার্ট, আড্ডাবাজ, দুষ্টু 😜",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
