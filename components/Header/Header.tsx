"use client";

import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <header className="w-full flex justify-between h-16 sticky top-0 bg-white border-b border-zinc-300 items-center px-8">
      <div>LOGO</div>
      <div>Settings</div>
    </header>
  );
}
