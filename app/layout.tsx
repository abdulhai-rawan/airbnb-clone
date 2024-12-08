import "./globals.css";

import ClientOnly from "@/components/client-only";
import LoginModal from "@/components/modals/login-modal";
import Navbar from "@/components/navbar/navbar";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/modals/register-modal";
import RentModal from "@/components/modals/rent-modal";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "@/providers/toaster-provider";
import { auth } from "@/auth";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
          </ClientOnly>
          <Navbar />
          <div className="pb-20 pt-28">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
