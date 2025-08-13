"use client";

import { Spinner } from "@heroui/react";

export default function PDFLoading() {
  return (
    <div className="hw-full px-1.5 pt-1.5 bg-[#787878]">
      <div className="hw-full bg-white flex flex-col gap-4 items-center justify-center">
        <Spinner size="lg" />
        <p>PDF is being recreated...</p>
      </div>
    </div>
  );
}
