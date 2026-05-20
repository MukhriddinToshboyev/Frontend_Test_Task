
import "./globals.css";
import { Providers } from "../providers";
import { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";


export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'Modern e-commerce dashboard',
};

export  default function  RootLayout ({children}: {children: React.ReactNode}){
  return (
    <html>
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
        </body>
    </html>
  );
}
