import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const knockout = localFont({
  src: "../../public/fonts/Knockout-HTF67-FullBantamwt.otf",
  variable: "--font-knockout",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Greylan James",
  description:
    "Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${knockout.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/exs1pha.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
