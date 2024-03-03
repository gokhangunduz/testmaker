"use client";

import { languagePersistor } from "@/functions/languagepersistor.function";
import { languageViewer } from "@/constants/language.viewer.constant";
import { ILanguages } from "@/interfaces/i18n.interface";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { ReactElement } from "react";

export default function LanguageSwitcher(): ReactElement {
  const { i18n } = useTranslation();

  function handleOnChange(lang: ILanguages) {
    i18n.changeLanguage(lang);
    languagePersistor(lang);
  }

  return (
    <Dropdown
      value={i18n.language}
      options={i18n.languages.map((lang) => ({
        label: languageViewer(lang as ILanguages),
        value: lang,
      }))}
      optionValue="value"
      optionLabel="label"
      placeholder="Languages"
      onChange={(e) => handleOnChange(e.value as ILanguages)}
    />
  );
}
