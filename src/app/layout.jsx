import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cartContext";
import { UserProvider } from "@/context/userContext";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Furlink",
  description: "Furlink Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <CartProvider>
            <Navbar/>
            {children}
            <Footer/>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}