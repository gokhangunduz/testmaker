import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
}

export default function Card({ children }: Readonly<ICard>) {
  return (
    <div className="animate__animated animate__fadeIn h-full w-full bg-white border border-gray-200 shadow-md p-4 rounded-md">
      {children}
    </div>
  );
}
