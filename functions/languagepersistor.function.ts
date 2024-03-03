"use client";

import { ILanguages } from "@/interfaces/i18n.interface";

export function languagePersistor(lang?: ILanguages): ILanguages {
  if (typeof window !== "undefined") {
    if (lang) {
      localStorage.setItem("lang", lang);
      return lang;
    }

    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "en");
      return "en";
    }

    return localStorage.getItem("lang") as ILanguages;
  } else {
    return "en";
  }
}
