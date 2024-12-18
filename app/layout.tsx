import "./globals.css";

import { ModalProvider } from "@/providers/modal-provider";
import Navbar from "@/components/navbar/navbar";
import { Nunito } from "next/font/google";
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
          <ModalProvider />
          <ToasterProvider />
          <Navbar />
          <div className="pb-20 pt-28">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
