import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/lib/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopHub - Your Premium eCommerce Destination",
  description: "Discover quality products at unbeatable prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
