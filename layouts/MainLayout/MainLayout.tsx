"use client";

import { PrimeReactProvider } from "primereact/api";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Fragment, ReactElement } from "react";
import "animate.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

interface IMainLayout {
  children: ReactElement | ReactElement[];
}

export default function MainLayout({ children }: Readonly<IMainLayout>) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>
          <Header />
          <Fragment>{children}</Fragment>
          <Footer />
        </PrimeReactProvider>
      </body>
    </html>
  );
}
