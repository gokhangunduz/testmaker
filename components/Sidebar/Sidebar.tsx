"use client";

import { ReactElement, useEffect } from "react";
import InputText from "../InputText/InputText";
import { useFormik } from "formik";
import useApp from "@/hooks/useApp";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

export default function Sidebar(): ReactElement {
  const { details, settings, handleSetDetails, handleSetSettings } = useApp();

  const formik = useFormik({
    initialValues: {
      details: details,
      settings: settings,
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    handleSetDetails(formik?.values?.details);
    handleSetSettings(formik?.values?.settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values]);

  return (
    <div className=" hw-full bg-red-300 p-6 flex flex-col gap-6">
      <InputText
        label="Title"
        formikProps={formik.getFieldProps("details.title")}
      />
      <InputText
        label="Subtitle"
        formikProps={formik.getFieldProps("details.subtitle")}
      />
      <ButtonGroup
        value={
          formik.values.settings.answers.isPerPage
            ? {
                label: "On",
                value: true,
              }
            : {
                label: "Off",
                value: false,
              }
        }
        options={[
          {
            label: "On",
            value: true,
          },
          {
            label: "Off",
            value: false,
          },
        ]}
        onChange={(e) => {
          formik.setFieldValue("settings.answers.isPerPage", e.value);
        }}
      />
    </div>
  );
}
