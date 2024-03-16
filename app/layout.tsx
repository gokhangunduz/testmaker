"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ReactElement } from "react";
interface IMainRoot {
  children: ReactElement | ReactElement[];
}

export default function MainRoot({ children }: Readonly<IMainRoot>) {
  return <MainLayout>{children}</MainLayout>;
}
