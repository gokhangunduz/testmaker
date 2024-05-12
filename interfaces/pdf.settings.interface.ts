export interface ISettings {
  details: {
    title: string;
    subtitle: string;
  };
  answers: {
    isPerPage: boolean;
    isLastPage: boolean;
  };
  colors: {
    title: string;
    subtitle: string;
    questionNumber: string;
    border: string;
    pageNumber: string;
    pageAnswer: string;
  };
}
