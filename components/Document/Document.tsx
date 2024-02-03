"use client";

import React, { ReactElement, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document as PDF,
  StyleSheet,
} from "@react-pdf/renderer";

export default function Document(): ReactElement {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#FFF",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <PDF>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </PDF>
  );
}
