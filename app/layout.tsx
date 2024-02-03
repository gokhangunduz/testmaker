import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ReactElement } from "react";
import "@/styles/global.css";
interface IMainRoot {
  children: ReactElement | ReactElement[];
}

export default function MainRoot({ children }: Readonly<IMainRoot>) {
  return <MainLayout>{children}</MainLayout>;
}
