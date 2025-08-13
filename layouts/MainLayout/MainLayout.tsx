"use client";

import { PrimeReactProvider } from "primereact/api";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Fragment, ReactElement } from "react";
import "@/styles/global.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "animate.css";
import "@/i18n/i18n";
import Head from "next/head";
import { HeroUIProvider } from "@heroui/react";

interface IMainLayout {
  children: ReactElement | ReactElement[];
}

export default function MainLayout({ children }: Readonly<IMainLayout>) {
  return (
    <html lang="en">
      <Head>
        <title>TestMakerLab</title>
        <meta
          name="description"
          content="TestMakerLab is a tool developed specifically for professionals and educators who prepare educational materials. It facilitates the quick and efficient conversion of image-based questions into PDF files."
        />
      </Head>
      <body>
        <PrimeReactProvider>
          <HeroUIProvider>
            <Header />
            <Fragment>{children}</Fragment>
            <Footer />
          </HeroUIProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
