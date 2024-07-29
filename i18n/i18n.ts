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
      dragAndDropQuestionImages: "Soru görsellerini buraya sürükleyiniz.",
      questionScale: "Soru Boyutu",
      projectRelease: "TestMakerLab Yayında!",
      projectDescription:
        "TestMakerLab, eğitim materyali hazırlayan profesyoneller ve eğitmenler için özel olarak geliştirilmiş bir araçtır. Görsel tabanlı soruların hızlı ve verimli bir şekilde PDF dosyalarına dönüştürülmesini sağlar.",
      getStarted: "Başla",
      feedback: "Geri Bildirim",
      welcome: "TestMakerLab'e Hoşgeldiniz 🎉",
      beta: "TestMakerLab şu anda beta aşamasında.",
      issues: "Önceden oluşabilecek olası sorunlar için özür dileriz.",
      betaEmail:
        "Herhangi bir sorunuz veya geri bildiriminiz varsa lütfen bize bir e-posta gönderin",
      cancel: "İptal",
      save: "Kaydet",
      editQuestion: "Soruyu Düzenle",
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
      projectRelease: "TestMakerLab Released!",
      projectDescription:
        "TestMakerLab is a tool developed specifically for professionals and educators who prepare educational materials. It facilitates the quick and efficient conversion of image-based questions into PDF files.",
      getStarted: "Get Started",
      feedback: "Feedback",
      welcome: "Welcome to TestMakerLab 🎉",
      beta: "TestMakerLab is now in beta.",
      issues:
        "We apologize in advance for any potential issues that may arise.",
      betaEmail:
        "If you have any isses or feedback, please send us an email at",
      cancel: "Cancel",
      save: "Save",
      editQuestion: "Edit Question",
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
      projectRelease: "TestMakerLab Veröffentlicht!",
      projectDescription:
        "TestMakerLab ist ein speziell für Fachleute und Pädagogen entwickeltes Tool, das die schnelle und effiziente Umwandlung von bildbasierten Fragen in PDF-Dateien ermöglicht.",
      getStarted: "Loslegen",
      feedback: "Feedback",
      welcome: "Willkommen bei TestMakerLab 🎉",
      beta: "TestMakerLab ist jetzt in der Beta.",
      issues:
        "Wir entschuldigen uns im Voraus für mögliche Probleme, die auftreten können.",
      betaEmail:
        "Wenn Sie Probleme oder Feedback haben, senden Sie uns bitte eine E-Mail an",
      cancel: "Stornieren",
      save: "Speichern",
      editQuestion: "Frage bearbeiten",
    },
  },
};

i18n.use(initReactI18next).init({
  lng: languagePersistor(),
  resources: resources,
  fallbackLng: ["en", "tr", "de"],
});

export default i18n;
