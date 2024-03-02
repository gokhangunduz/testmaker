"use client";

import { ReactElement } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Header(): ReactElement {
  return (
    <header className="w-full flex justify-between h-16 sticky top-0 bg-white border-b border-zinc-300 items-center px-8">
      <div>LOGO</div>
      <div className="flex gap-2">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
