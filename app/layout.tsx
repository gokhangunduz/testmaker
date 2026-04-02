"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ReactNode } from "react";
interface IMainRoot {
  children: ReactNode;
}

export default function MainRoot({ children }: Readonly<IMainRoot>) {
  return <MainLayout>{children}</MainLayout>;
}
