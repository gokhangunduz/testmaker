import type { Metadata } from "next";
import { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import I18nProvider from "@/components/I18nProvider/I18nProvider";
import "@/styles/global.css";
import "animate.css";

export const metadata: Metadata = {
  title: "TestMakerLab",
  description:
    "TestMakerLab is a tool developed specifically for professionals and educators who prepare educational materials. It facilitates the quick and efficient conversion of image-based questions into PDF files.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
