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
import { IQuestion } from "@/interfaces/app.interface";
import { handleMapperPages } from "@/functions/mapper.pages.function";
import { handleParserQuestions } from "@/functions/parser.questions.function";

export default function PDF({
  questions,
}: {
  questions: IQuestion[];
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
      padding: "1%",
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
      fontSize: 12,
    },
    sectionFooter: {
      width: "100%",
      height: "4%",
      borderBottom: "1px solid #000",
      borderTop: "1px solid #000",
    },
  });

  const pages = handleMapperPages(handleParserQuestions(questions));

  return (
    <Document>
      {pages?.map((column, pageIndex) => {
        return (
          <Page size="A4" style={styles.page} key={pageIndex}>
            <View style={styles.sectionHeader}>
              <Text style={styles.textTitle}>Title</Text>
              <Text style={styles.textSubtitle}>Subtitle</Text>
            </View>
            <View style={styles.sectionLayout}>
              <View
                style={{
                  ...styles.sectionColumn,
                  borderRight: "1px solid #000",
                }}
              >
                {column?.[0]?.map((question, questionIndex) => (
                  <View style={styles.sectionQuestion} key={questionIndex}>
                    <View style={styles.layoutQuestion}>
                      <Text style={styles.textQuestion}>1)</Text>
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
              <View style={styles.sectionColumn}>
                {column?.[1]?.map((question, questionIndex) => (
                  <View style={styles.sectionQuestion} key={questionIndex}>
                    <View style={styles.layoutQuestion}>
                      <Text style={styles.textQuestion}>1)</Text>
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
            </View>
            <View style={styles.sectionFooter}>
              <Text>{pageIndex + 1}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
