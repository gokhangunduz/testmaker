import { ReactNode, ReactElement } from "react";
import { Separator } from "@heroui/react";

interface ISidebarSection {
  label: string;
  children: ReactNode;
  gap?: number;
  className?: string;
}

export default function SidebarSection({
  label,
  children,
  gap = 3,
  className = "",
}: ISidebarSection): ReactElement {
  return (
    <section className={`flex w-full flex-col gap-3 ${className}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {label}
        </h3>
        <Separator />
      </div>
      <div className="flex w-full flex-col" style={{ gap: `${gap * 0.25}rem` }}>
        {children}
      </div>
    </section>
  );
}
