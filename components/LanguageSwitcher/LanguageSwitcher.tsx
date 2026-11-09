"use client";

import { Key, ReactElement } from "react";
import { ListBox, Select } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { languageNames } from "@/constants/language.viewer.constant";
import { persistLanguage } from "@/functions/languagepersistor.function";
import { ILanguages, LANGUAGES } from "@/interfaces/i18n.interface";

export default function LanguageSwitcher(): ReactElement {
  const { i18n, t } = useTranslation();

  function handleChange(key: Key | null) {
    if (!key) return;

    const lang = String(key) as ILanguages;
    i18n.changeLanguage(lang);
    persistLanguage(lang);
  }

  return (
    <Select
      aria-label={t("language")}
      value={i18n.resolvedLanguage}
      onChange={handleChange}
      className="w-28 sm:w-36"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {LANGUAGES.map((lang) => (
            <ListBox.Item key={lang} id={lang} textValue={languageNames[lang]}>
              {languageNames[lang]}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
