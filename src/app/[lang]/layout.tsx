import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Header, Footer } from "@/components";
import { Toaster } from "@/components/ui";
import { TanstackProvider, ThemeProvider } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TKS Weather",
  icons: {
    icon: "/weather.svg",
  }
};

type Params = {
  lang: string;
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lang } = await params;

  const messages = await getMessages();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="bg-gradient-to-br from-background to-muted">
                <Header />
                <main className="min-h-screen container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
              </div>

              <Toaster richColors/>
            </ThemeProvider>
          </TanstackProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
