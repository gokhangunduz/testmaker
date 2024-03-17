"use client";

import { Dialog } from "primereact/dialog";
import { CSSProperties, ReactElement } from "react";

interface IModal {
  header?: string;
  style?: CSSProperties;
  onHide: () => void;
  children: ReactElement | ReactElement[];
  draggable?: boolean;
}

export default function Modal({
  header,
  style,
  onHide,
  children,
  draggable,
}: IModal): ReactElement {
  return (
    <Dialog
      header={header}
      visible
      style={style || { width: "50vw" }}
      draggable={draggable || false}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
}
