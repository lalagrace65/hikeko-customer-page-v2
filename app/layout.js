import AppProvider from "@/components/AppContext";
import "./globals.css";
import Header from "@/components/layout/Header";
import { UserLocationProvider } from "@/context/UserLocationContext";
import Footer from "@/components/layout/Footer";
import ClientLayout from "./clientLayout";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
      <AppProvider>
      <UserLocationProvider>
        <Toaster />
        <Header />
        <ClientLayout />
          {children}
          <footer className="border-t p-8 text-center text-gray-500 mt-16">
                &copy;2024. Hikeko. All rights reserved
          </footer>
          <Footer/>
        </UserLocationProvider>
      </AppProvider>
      </body>
    </html>
  );
}
