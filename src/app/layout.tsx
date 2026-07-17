import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ChatAssistant from "../components/layout/ChatAssistant";

export const metadata: Metadata = {
  title: "LoomLedger — Authentic Handloom, Blockchain Verified",
  description: "Digital trust platform for authentic handloom products. Track artisan stories, scan QR codes, and verify Geographical Indication (GI) textile certificates on Polygon blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary-light selection:text-primary">
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <ChatAssistant />
        </Providers>
      </body>
    </html>
  );
}
