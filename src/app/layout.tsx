import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "800"],
});

const text = Fraunces({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Battlenips",
  description:
    "A one-guess picture game. A stylized sumo wrestler hides under a 10×10 grid numbered 1 to 100. Tap the square you think is hiding the nipple.",
};

export const viewport: Viewport = {
  themeColor: "#1e2a4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
