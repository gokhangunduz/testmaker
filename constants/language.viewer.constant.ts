import { ILanguages } from "@/interfaces/i18n.interface";

export function languageViewer(lang: ILanguages): string {
  switch (lang) {
    case "en":
      return "English";
    case "tr":
      return "Türkçe";
    case "de":
      return "German";
  }
}
