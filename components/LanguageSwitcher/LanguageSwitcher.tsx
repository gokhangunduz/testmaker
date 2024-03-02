"use client";

import { ReactElement, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher(): ReactElement {
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log(i18n.languages);
  }, [i18n]);

  return (
    <Dropdown
      value={i18n.language}
      options={i18n.languages.map((lang) => ({
        label: lang,
        value: lang,
      }))}
      optionValue="value"
      optionLabel="label"
      placeholder="Languages"
      onChange={(e) => i18n.changeLanguage(e.value)}
    />
  );
}
