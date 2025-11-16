import "./globals.css";
import { CartProvider } from "@/context/cartContext";
import { UserProvider } from "@/context/userContext";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

export const metadata = {
  title: "Furlink",
  description: "Furlink Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UserProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}