import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
}

export default function Card({ children }: Readonly<ICard>) {
  return (
    <div className="bg-white border border-gray-200 shadow-md p-4 rounded-md">
      {children}
    </div>
  );
}
