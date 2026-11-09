"use client";

import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PDF from "@/components/PDF/PDF";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import PDFPreview from "../PDFPreview/PDFPreview";
import PDFDownload from "../PDFDownload/PDFDownload";
import PDFEmpty from "../PDFEmpty/PDFEmpty";
import { handleParserQuestions } from "@/functions/parser.questions.function";
import { handleMapperPages } from "@/functions/mapper.pages.function";

export default function Preview(): ReactElement {
  const { questions, settings, isPDFLoading } = useApp();
  const { t } = useTranslation();

  const pages = useMemo(() => {
    const questionPages = handleMapperPages(
      handleParserQuestions(questions)
    ).length;

    return questions.length > 0 && settings.answers.isLastPage
      ? questionPages + 1
      : questionPages;
  }, [questions, settings.answers.isLastPage]);

  function renderPDF() {
    if (isPDFLoading) return <PDFLoading />;
    if (questions.length === 0) return <PDFEmpty />;

    return (
      <PDFPreview>
        <PDF
          questions={questions}
          settings={settings}
          answersTitle={t("answerKey")}
        />
      </PDFPreview>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:px-4">
        <div className="min-w-0">
          <h2 className="truncate font-medium">{t("preview")}</h2>
          {pages > 0 && (
            <p className="text-xs text-muted">{t("pagesCount", { count: pages })}</p>
          )}
        </div>
        {questions.length > 0 && <PDFDownload disabled={isPDFLoading} />}
      </div>
      <div className="min-h-0 flex-1 bg-background-secondary">{renderPDF()}</div>
    </div>
  );
}
