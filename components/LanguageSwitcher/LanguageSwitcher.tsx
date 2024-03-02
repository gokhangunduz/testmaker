"use client";

import { ReactElement, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher(): ReactElement {
  const { i18n } = useTranslation();

  return (
    <Dropdown
      value={i18n.language}
      options={[
        { label: "English", value: "en" },
        { label: "Türkçe", value: "tr" },
        { label: "Deutsch", value: "de" },
      ]}
      onChange={(e) => i18n.changeLanguage(e.value)}
      placeholder="Languages"
    />
  );
}
