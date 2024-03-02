"use client";

import { ReactElement } from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher(): ReactElement {
  const { i18n } = useTranslation();

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
