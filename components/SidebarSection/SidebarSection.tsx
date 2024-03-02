"use client";

import { ReactElement } from "react";

interface ISidebarSection {
  label: string;
  children: ReactElement | ReactElement[];
  gap?: number;
  containerClassName?: string;
  labelClassName?: string;
}

export default function SidebarSection({
  label,
  children,
  gap = 4,
  containerClassName,
  labelClassName,
}: ISidebarSection): ReactElement {
  return (
    <div className={`w-full flex flex-col gap-4 ${containerClassName}`}>
      <p className={`text-base font-medium text-zinc-800 ${labelClassName}`}>
        {label}:
      </p>
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
