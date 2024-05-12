"use client";

import { ReactElement } from "react";
import { Button as NextButton } from "@nextui-org/button";

interface IButton {
  label: string;
  onClick?: () => void;
}

export default function Button({
  label,
  onClick,
}: Readonly<IButton>): ReactElement {
  return (
    // <button
    //   className="bg-primary-500 text-primary-900 hover:bg-primary-600 hover:scale-95 active:bg-primary-700 border border-primary-700 px-12 py-3 rounded-lg transition-300"
    //   onClick={onClick}
    // >
    //   {label}
    // </button>
    <NextButton onClick={onClick} color="primary">
      {label}
    </NextButton>
  );
}
