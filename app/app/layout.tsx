import AppLayout from "@/layouts/AppLayout/AppLayout";
import { ReactElement } from "react";

interface ILayout {
  children: ReactElement | ReactElement[];
}

export default function Layout({ children }: Readonly<ILayout>) {
  return <AppLayout>{children}</AppLayout>;
}
