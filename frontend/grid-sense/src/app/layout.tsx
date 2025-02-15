import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grid Sense",
  description: "The smart solution to energy optimizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>{children}</body>
    </html>
  );
}
