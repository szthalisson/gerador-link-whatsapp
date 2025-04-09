import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "400", "500", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatsApp Link Generator",
  description: "A Generator of WhatsApp links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.style}`}>{children}</body>
    </html>
  );
}
