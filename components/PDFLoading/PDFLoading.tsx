"use client";

import { ProgressSpinner } from "primereact/progressspinner";

export default function PDFLoading() {
  return (
    <div className="hw-full px-1.5 pt-1.5 bg-[#787878]">
      <div className="hw-full bg-white flex flex-col gap-4 items-center justify-center">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="4"
          color="000000"
        />
        <p>PDF is being recreated...</p>
      </div>
    </div>
  );
}
