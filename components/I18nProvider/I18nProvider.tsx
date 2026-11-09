"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nProvider as AriaI18nProvider } from "@heroui/react";
import i18n from "@/i18n/i18n";
import { getPersistedLanguage } from "@/functions/languagepersistor.function";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const apply = (lang: string) => {
      document.documentElement.lang = lang;
      setLocale(lang);
    };

    i18n.on("languageChanged", apply);
    i18n.changeLanguage(getPersistedLanguage());

    return () => i18n.off("languageChanged", apply);
  }, []);

  return <AriaI18nProvider locale={locale}>{children}</AriaI18nProvider>;
}
