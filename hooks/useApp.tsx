"use client";

import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { IuseApp } from "@/interfaces/app.hook.interface";

export default function useApp(): IuseApp {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
