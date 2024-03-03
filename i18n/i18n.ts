"use client";

import { languagePersistor } from "@/functions/languagepersistor.function";
import { initReactI18next } from "react-i18next";
import i18n, { Resource } from "i18next";

const resources: Resource = {
  tr: {
    translation: {
      question: "Soru",
      questions: "Sorular",
      answer: "Cevap",
      answerKey: "Cevap Anahtarı",
      answerKeys: "Cevap Anahtarları",
      null: "Boş",
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
      dragAndDropQuestionImages:
        "Soru görsellerini buraya sürükleyip bırakınız.",
      questionScale: "Soru Boyutu",
    },
  },
  en: {
    translation: {
      question: "Question",
      questions: "Questions",
      answer: "Answer",
      answerKey: "Answer Key",
      answerKeys: "Answer Keys",
      null: "N/A",
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
      dragAndDropQuestionImages: "Drag and drop question images here.",
      questionScale: "Question Scale",
    },
  },
  de: {
    translation: {
      question: "Frage",
      questions: "Fragen",
      answer: "Antwort",
      answerKey: "Antwort Schlüssel",
      answerKeys: "Antwort Schlüssel",
      null: "N/A",
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
      dragAndDropQuestionImages: "Ziehen Sie die Fragebilder hierher.",
      questionScale: "Frage Skala",
    },
  },
};

i18n.use(initReactI18next).init({
  lng: languagePersistor(),
  resources: resources,
  fallbackLng: ["en", "tr", "de"],
});

export default i18n;