"use client";

import { ReactElement } from "react";

interface ISidebarSection {
  label: string;
  children: ReactElement | ReactElement[];
  gap?: number;
}

export default function SidebarSection({
  label,
  children,
  gap = 4,
}: ISidebarSection): ReactElement {
  return (
    <div className="w-full flex flex-col gap-8">
      <p className="text-base font-medium">{label}:</p>
      <div
        style={{
          gap: `${gap / 4}rem`,
        }}
        className="flex w-full flex-col"
      >
        {children}
      </div>
    </div>
  );
}
