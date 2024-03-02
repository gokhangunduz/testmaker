"use client";

import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

const resources: Resource = {
  tr: {
    translation: {
      question: "Soru",
      questions: "Sorular",
      answerKey: "Cevap Anahtarı",
      answerKeys: "Cevap Anahtarları",
      isPerPageAnswers: "Sayfa başına cevaplar",
      isLastPageAnswers: "Son sayfa cevaplar",
      titles: "Başlıklar",
      title: "Başlık",
      subtitle: "Alt Başlık",
      colors: "Renkler",
      lineColor: "Çizgi Rengi",
      titleColor: "Başlık Rengi",
      subtitleColor: "Alt Başlık Rengi",
      questionNumberColor: "Soru Numarası Rengi",
      pageNumberColor: "Sayfa Numarası Rengi",
      pageAnswerColor: "Sayfa Cevap Rengi",
    },
  },
  en: {
    translation: {
      question: "Question",
      questions: "Questions",
      answerKey: "Answer Key",
      answerKeys: "Answer Keys",
      isPerPageAnswers: "Per Page Answers",
      isLastPageAnswers: "Last Page Answers",
      titles: "Titles",
      title: "Title",
      subtitle: "Subtitle",
      colors: "Colors",
      lineColor: "Line Color",
      titleColor: "Title Color",
      subtitleColor: "Subtitle Color",
      questionNumberColor: "Question Number Color",
      pageNumberColor: "Page Number Color",
      pageAnswerColor: "Page Answer Color",
    },
  },
  de: {
    translation: {
      question: "Frage",
      questions: "Fragen",
      answerKey: "Antwort Schlüssel",
      answerKeys: "Antwort Schlüssel",
      isPerPageAnswers: "Pro Seite Antworten",
      isLastPageAnswers: "Letzte Seite Antworten",
      titles: "Titel",
      title: "Titel",
      subtitle: "Untertitel",
      colors: "Farben",
      lineColor: "Linienfarbe",
      titleColor: "Titelfarbe",
      subtitleColor: "Untertitelfarbe",
      questionNumberColor: "Fragennummer Farbe",
      pageNumberColor: "Seitennummer Farbe",
      pageAnswerColor: "Seitenantwort Farbe",
    },
  },
};

i18n.use(initReactI18next).init({
  lng: "tr",
  resources: resources,
  fallbackLng: ["en", "tr", "de"],
});

export default i18n;
