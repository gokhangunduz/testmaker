/* eslint-disable jsx-a11y/alt-text */
"use client";

import { ReactElement } from "react";
import {
  Page,
  View,
  StyleSheet,
  Document,
  Image,
  Text,
} from "@react-pdf/renderer";
import { handleMapperPages } from "@/functions/mapper.pages.function";
import { handleParserQuestions } from "@/functions/parser.questions.function";
import { IQuestion } from "@/interfaces/pdf.question.interface";
import { IDetails } from "@/interfaces/pdf.details.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";

export default function PDF({
  questions,
  details,
  settings,
}: {
  questions: IQuestion[];
  details: IDetails;
  settings: ISettings;
}): ReactElement {
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      height: "100%",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
      flexDirection: "column",
    },
    sectionHeader: {
      width: "100%",
      height: "6%",
      padding: "1.5%",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      border: "1px solid #000",
      borderRadius: "25%",
    },
    textTitle: {
      fontSize: 14,
      textAlign: "center",
    },
    textSubtitle: {
      fontSize: 10,
      textAlign: "center",
    },
    sectionLayout: {
      height: "90%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sectionColumn: {
      width: "100%",
      padding: "2%",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    sectionQuestion: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    layoutQuestion: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: "0.125cm",
    },
    imageQuestion: {
      objectFit: "contain",
      objectPosition: "left top",
    },
    textQuestion: {
      textAlign: "left",
      fontSize: 10,
    },
    sectionFooter: {
      width: "100%",
      height: "4%",
      flexDirection: "row",
      justifyContent: settings.answers.isPerPage ? "space-between" : "center",
      alignItems: "center",
      borderBottom: "1px solid #000",
      borderTop: "1px solid #000",
    },
    textFooterPageNumber: {
      fontSize: 12,
    },
    textFooterAnswers: {
      fontSize: 12,
    },
  });

  const pages = handleMapperPages(handleParserQuestions(questions));

  return (
    <Document>
      {pages?.map((columns, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          <View style={styles.sectionHeader}>
            <Text style={styles.textTitle}>{details?.title}</Text>
            <Text style={styles.textSubtitle}>{details?.subtitle}</Text>
          </View>
          <View style={styles.sectionLayout}>
            {columns?.map((column, colIndex) => (
              <View
                key={colIndex}
                style={{
                  ...styles.sectionColumn,
                  ...(colIndex === 0 && { borderRight: "1px solid #000" }),
                }}
              >
                {column?.map((question, qIndex) => (
                  <View style={styles.sectionQuestion} key={qIndex}>
                    <View style={styles.layoutQuestion}>
                      <Text style={styles.textQuestion}>
                        {question.index! + 1})
                      </Text>
                      <Image
                        style={{
                          ...styles.imageQuestion,
                          width: `${question.scale * 100}%`,
                        }}
                        src={question.base64!}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.sectionFooter}>
            <Text style={styles.textFooterPageNumber}>{pageIndex + 1}</Text>
            {settings.answers.isPerPage && (
              <Text style={styles.textFooterAnswers}>
                {columns
                  ?.flat()
                  ?.map((question) => {
                    return `${question.index! + 1}${question?.answer || "?"}`;
                  })
                  ?.join("  ")}
              </Text>
            )}
          </View>
        </Page>
      ))}
      {settings.answers.isLastPage && (
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionHeader}>
            <Text style={styles.textTitle}>{details?.title}</Text>
            <Text style={styles.textSubtitle}>{details?.subtitle}</Text>
          </View>
          <View
            style={{
              ...styles.sectionLayout,
              paddingTop: "1%",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2.5%",
              gap: "0.5cm",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                width: "100%",
              }}
            >
              Answers of the questions
            </Text>
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {pages
                ?.flat()
                ?.flat()
                ?.map((question, index) => (
                  <View
                    style={{
                      padding: "0.5%",
                      width: "10%",
                      border: "1px solid #000",
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      {index + 1}:{question?.answer || "?"}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
}
