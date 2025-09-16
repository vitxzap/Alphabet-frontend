import { JetBrains_Mono, DM_Sans, Inter } from "next/font/google";
import { Provider } from "@/components/ui/provider";

const inter = Inter({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetBrains_Mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrains_Mono.variable} antialiased`}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
