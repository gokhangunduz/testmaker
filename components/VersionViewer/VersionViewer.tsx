"use client";

import { ReactElement } from "react";
import packageJSON from "../../package.json";

export default function VersionViewer(): ReactElement {
  return (
    <p className="fixed bottom-2 right-2.5 z-50 !text-xs text-gray-500 pointer-events-none">
      {process.env.NODE_ENV === "production" ? "P" : "D"} {packageJSON?.version}
    </p>
  );
}
