import { ReactNode } from "react";
import AppLayout from "@/layouts/AppLayout/AppLayout";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AppLayout />
      {children}
    </>
  );
}
