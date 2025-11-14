"use client";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toast } from "@/components/ui/toast";
import { TanstackProvider } from "@/components/providers/tanstackProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrains.variable} antialiased h-dvh w-dvw flex`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <TanstackProvider>
            <Toast position="top-center" />
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
