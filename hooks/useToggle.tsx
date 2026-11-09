"use client";

import { useCallback, useState } from "react";

export default function useToggle(defaultValue: boolean = false) {
  const [toggle, setToggle] = useState<boolean>(defaultValue);

  const handleToggle = useCallback((value?: boolean) => {
    setToggle((prev) => value ?? !prev);
  }, []);

  return { toggle, handleToggle };
}
