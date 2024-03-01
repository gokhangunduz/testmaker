"use client";

import SidebarSection from "../SidebarSection/SidebarSection";
import InputSwitch from "../InputSwitch/InputSwitch";
import { ReactElement, useEffect } from "react";
import InputText from "../InputText/InputText";
import useApp from "@/hooks/useApp";
import { useFormik } from "formik";
import InputColor from "../InputColor/InputColor";

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

  useEffect(() => {
    console.log(formik?.values);
  }, [formik?.values]);

  return (
    <div className="hw-full bg-zinc-100 border-r border-zinc-300 p-6 flex flex-col gap-8">
      <SidebarSection label="Details" gap={8}>
        <InputText
          label="Title"
          formikProps={formik.getFieldProps("details.title")}
        />
        <InputText
          label="Subtitle"
          formikProps={formik.getFieldProps("details.subtitle")}
        />
      </SidebarSection>

      <SidebarSection label="Answers">
        <InputSwitch
          label="Per Page"
          checked={formik.values.settings.answers.isPerPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isPerPage", e.value)
          }
        />
        <InputSwitch
          label="Last Page"
          checked={formik.values.settings.answers.isLastPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isLastPage", e.value)
          }
        />
      </SidebarSection>

      <SidebarSection label="Colors">
        <InputColor
          label="Border Color"
          color={formik.values.settings?.colors?.border}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.border", `#${e.value}`)
          }
        />
        <InputColor
          label="Title Color"
          color={formik.values.settings?.colors?.title}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.title", `#${e.value}`)
          }
        />
        <InputColor
          label="Subtitle Color"
          color={formik.values.settings?.colors?.subtitle}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.subtitle", `#${e.value}`)
          }
        />
        <InputColor
          label="Question Number Color"
          color={formik.values.settings?.colors?.questionNumber}
          onChange={(e) =>
            formik.setFieldValue(
              "settings.colors.questionNumber",
              `#${e.value}`
            )
          }
        />
        <InputColor
          label="Page Number Color"
          color={formik.values.settings?.colors?.pageNumber}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.pageNumber", `#${e.value}`)
          }
        />
        <InputColor
          label="Page Answer Color"
          color={formik.values.settings?.colors?.pageAnswer}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.pageAnswer", `#${e.value}`)
          }
        />
      </SidebarSection>
    </div>
  );
}
