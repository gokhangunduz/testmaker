"use client";

import { Dialog } from "primereact/dialog";
import { CSSProperties, ReactElement } from "react";

interface IModal {
  header?: string;
  style?: CSSProperties;
  onHide: () => void;
  children: ReactElement | ReactElement[];
}

export default function Modal({
  header,
  style,
  onHide,
  children,
}: IModal): ReactElement {
  return (
    <Dialog
      header={header}
      visible
      style={style || { width: "50vw" }}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
}
