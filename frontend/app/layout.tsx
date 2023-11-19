import "./globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/react';
import NextTopLoader from "nextjs-toploader";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-Regular.ttf",
  weight: "400",
  variable: "--font-montserrat",
  display: "swap",
});

const montserratMedium = localFont({
  src: "../public/fonts/Montserrat-Medium.ttf",
  weight: "400",
  variable: "--font-montserrat-medium",
  display: "swap",
});

const montserratSemibold = localFont({
  src: "../public/fonts/Montserrat-SemiBold.ttf",
  weight: "400",
  variable: "--font-montserrat-semibold",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://portfoliofront-ope15eqfb-lukabugarin6.vercel.app"
  ),
  title: "Luka Bugarin",
  description:
    "Experienced software developer crafting robust and innovative solutions for diverse applications.",
  authors: [{ name: "Luka Bugarin", url: "https://lukabugarin.com" }],
  openGraph: {
    title: "Luka Bugarin",
    description:
      "Experienced software developer crafting robust and innovative solutions for diverse applications.",
    url: "https://lukabugarin.com",
    siteName: "Luka Bugarin",
    images: [
      {
        url: "https://lukabugarin.com/bg.png",
        alt: "Luka Bugarin",
      },
    ],
    type: "website",
  },
  twitter: {
	card: 'summary_large_image',
    site: '@yourTwitterHandle',
    creator: '@yourCreatorHandle',
    images: 'https://lukabugarin.com/bg.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "text-[#111010]",
        montserrat.variable,
        montserratMedium.variable,
        montserratSemibold.variable
      )}
    >
      <body className="bg-white antialiased flex flex-col md:flex-row font-serif">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Navbar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0 px-4 pt-16 md:pt-20 lg:pt-48">
          {children}
          <Analytics />
          <Footer />
        </main>
      </body>
    </html>
  );
}
