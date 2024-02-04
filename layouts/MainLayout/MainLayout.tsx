import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Fragment, ReactElement } from "react";
import "animate.css";

interface IMainLayout {
  children: ReactElement | ReactElement[];
}

export default function MainLayout({ children }: Readonly<IMainLayout>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Fragment>{children}</Fragment>
        <Footer />
      </body>
    </html>
  );
}
