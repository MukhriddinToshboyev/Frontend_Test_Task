
import "./globals.css";
import { Providers } from "../providers";
import { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";


export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'Modern e-commerce dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="bg-white text-black min-h-screen">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
