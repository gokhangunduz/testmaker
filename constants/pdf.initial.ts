import { IDetails } from "@/interfaces/pdf.details.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";
import mockQuestions from "@/constants/pdf.questions.json";
import { IQuestion } from "@/interfaces/pdf.question.interface";

export const pdfInitialSettings: ISettings = {
  answers: {
    isPerPage: false,
    isLastPage: true,
  },
  colors: {
    title: "#000000",
    subtitle: "#000000",
    questionNumber: "#000000",
    border: "#000000",
    pageNumber: "#000000",
    pageAnswer: "#000000",
  },
};

export const pdfInitialDetails: IDetails = {
  title: "Title",
  subtitle: "Subtitle",
};

export const pdfInitialQuestions: IQuestion[] =
  process.env.NODE_ENV === "development" ? (mockQuestions as IQuestion[]) : [];
