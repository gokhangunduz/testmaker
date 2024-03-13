"use client";

import { ReactElement } from "react";
import packageJSON from "../../package.json";

export default function Footer(): ReactElement {
  return (
    <footer className="w-full flex font-light justify-between items-center h-8 sticky bottom-0 bg-white border-t border-zinc-300 text-xs px-4">
      <p>
        {process.env.NODE_ENV === "production" ? "P" : "D"}{" "}
        {packageJSON?.version}
      </p>
      <p className="">
        © {new Date().getFullYear()} TestMakerLab | All rights reserved.
      </p>
      <p>
        {process.env.NODE_ENV === "production" ? "P" : "D"}{" "}
        {packageJSON?.version}
      </p>
    </footer>
  );
}
