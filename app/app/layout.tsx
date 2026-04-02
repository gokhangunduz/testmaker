"use client";

import AppLayout from "@/layouts/AppLayout/AppLayout";
import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<ILayout>) {
  return <AppLayout>{children}</AppLayout>;
}
