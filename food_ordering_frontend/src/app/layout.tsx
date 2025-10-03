import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Ocean Eats – Order Food Online",
  description:
    "Browse restaurants, explore menus, and place food orders online with a modern, ocean-inspired interface.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProviders>
          <header className="app-header">
            <div className="container px-4 py-3 flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-black">
                  OE
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-5 tracking-tight">
                    Ocean Eats
                  </span>
                  <span className="text-xs text-gray-500 leading-4">
                    Blue & Amber taste better together
                  </span>
                </div>
              </Link>

              <div className="ml-auto flex items-center gap-3">
                <Link className="btn btn-ghost" href="/#restaurants">
                  Restaurants
                </Link>
                <Link className="btn btn-ghost" href="/#cuisines">
                  Cuisines
                </Link>
                <Link className="btn btn-ghost" href="/#deals">
                  Deals
                </Link>
                <Link className="btn btn-primary" href="/#order">
                  Start Order
                </Link>
              </div>
            </div>
          </header>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
