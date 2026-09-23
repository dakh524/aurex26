import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AurexChatbot from "@/components/AurexChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "தமிழ் உலகம் | Central Institute of Classical Tamil (CICT)",
  description: "Official Portal of Central Institute of Classical Tamil (CICT), Ministry of Education, Govt of India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ta"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#fbf7f0] text-slate-900" suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          <main className="flex-1 py-4 sm:py-6">
            {children}
          </main>
          <Footer />
          <AurexChatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}



