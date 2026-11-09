"use client";

import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { languageNames } from "@/constants/language.viewer.constant";
import { persistLanguage } from "@/functions/languagepersistor.function";
import { ILanguages, LANGUAGES } from "@/interfaces/i18n.interface";

export default function LanguageSwitcher(): ReactElement {
  const { i18n, t } = useTranslation();

  function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value as ILanguages;

    i18n.changeLanguage(lang);
    persistLanguage(lang);
  }

  return (
    <select
      aria-label={t("language")}
      value={i18n.resolvedLanguage}
      onChange={handleOnChange}
      className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-700 focus:outline-2 focus:outline-zinc-400"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {languageNames[lang]}
        </option>
      ))}
    </select>
  );
}
