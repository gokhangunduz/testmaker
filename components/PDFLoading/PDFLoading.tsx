"use client";

import { CircularProgress } from "@nextui-org/react";
import { PDFCreationTime } from "@/configs/config";
import { useEffect, useState } from "react";
import useApp from "@/hooks/useApp";

export default function PDFLoading() {
  const [value, setValue] = useState<number>(0);
  const { settings } = useApp();

  useEffect(() => {
    const interval = setInterval(() => {
      value < 100 && setValue((v) => v + 10);
    }, PDFCreationTime * 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <div className="hw-full px-1.5 pt-1.5 bg-[#787878]">
      <div className="hw-full bg-white flex flex-col gap-4 items-center justify-center">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="primary"
          showValueLabel={true}
        />
        <p>PDF is being recreated...</p>
      </div>
    </div>
  );
}
