
import "./globals.css";
import { Providers } from "../providers";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'Modern e-commerce dashboard',
};

export  default function  RootLayout ({children}: {children: React.ReactNode}){
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
