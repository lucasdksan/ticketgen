import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicketGen",
  description: "Gestão de atendimento profissional",
  icons: {
    icon: "/favicon.ico",
  },
  creator: "Lucas da Silva Leoncio",
  publisher: "Lucas da Silva Leoncio",
  applicationName: "TicketGen",
  keywords: ["ticket", "gen", "atendimento", "profissional", "gerador de senhas"],
  authors: [{ name: "Lucas da Silva Leoncio", url: "https://github.com/lucasdksan" }],
  openGraph: {
    title: "TicketGen",
    description: "Gestão de atendimento profissional",
    url: "https://ticketgen-three.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketGen",
    description: "Gestão de atendimento profissional",
    images: ["https://ticketgen-three.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
