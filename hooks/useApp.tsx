"use client";

import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { IuseApp } from "@/interfaces/app.interface";

const useApp = () => {
  const useApp: IuseApp = useContext<IuseApp>(AppContext);

  return useApp;
};

export default useApp;
