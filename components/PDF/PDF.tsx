/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { ReactElement } from "react";
import {
  Page,
  View,
  StyleSheet,
  Document,
  Image,
  Text,
} from "@react-pdf/renderer";
import { IQuestion } from "@/interfaces/app.interface";

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
      justifyContent: "space-between",
    },
    sectionTitle: {
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
    column: {
      width: "48%",
      flexDirection: "column",
      justifyContent: "space-between", // Set justifyContent to space-between
      marginBottom: "10px",
    },
    imageQuestion: {
      objectFit: "contain",
      marginBottom: "10px",
    },
  });

  const createPages = () => {
    const pages = [];

    for (let i = 0; i < questions.length; i += 4) {
      const pageQuestions = questions.slice(i, i + 4);

      pages.push(
        <Page size="A4" style={styles.page} key={i}>
          <View style={styles.sectionTitle}>
            <Text style={styles.textTitle}>Title</Text>
            <Text style={styles.textSubtitle}>Subtitle</Text>
          </View>
          <View style={styles.sectionLayout}>
            <View style={styles.column}>
              {pageQuestions.slice(0, 2).map((question, index) => (
                <Image
                  style={styles.imageQuestion}
                  src={question.base64!}
                  key={index}
                />
              ))}
            </View>
            <View style={styles.column}>
              {pageQuestions.slice(2, 4).map((question, index) => (
                <Image
                  style={styles.imageQuestion}
                  src={question.base64!}
                  key={index}
                />
              ))}
            </View>
          </View>
        </Page>
      );
    }

    return pages;
  };

  return <Document>{createPages()}</Document>;
}
