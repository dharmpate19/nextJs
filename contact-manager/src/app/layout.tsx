import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../app/_components/Navbar"



export const metadata: Metadata = {
  title: "Contact Manager",
  description: "A simple contact manager application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <main className="container mx-auto px-4 and py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
