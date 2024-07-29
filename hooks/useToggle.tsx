"use client";

import { useState } from "react";

const useToggle = (defaultValue?: boolean) => {
  const [toggle, setToggle] = useState<boolean>(defaultValue || false);

  function handleToggle(value?: boolean) {
    setToggle(value || !toggle);
  }

  const useToggle = {
    toggle,
    handleToggle,
  };

  return useToggle;
};

export default useToggle;
