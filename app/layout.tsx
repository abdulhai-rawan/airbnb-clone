import "./globals.css";

import Navbar from "@/components/navbar/navbar";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/modals/register-modal";
import ToasterProvider from "@/providers/toaster-provider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
