"use client";

import SidebarSection from "../SidebarSection/SidebarSection";
import InputSwitch from "../InputSwitch/InputSwitch";
import { ReactElement, useEffect } from "react";
import InputText from "../InputText/InputText";
import useApp from "@/hooks/useApp";
import { useFormik } from "formik";
import InputColor from "../InputColor/InputColor";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <div className="hw-full bg-zinc-100 border-r border-zinc-300 p-6 flex flex-col gap-6">
      <SidebarSection label={t("titles")} gap={8} labelClassName="pb-3">
        <InputText
          label={t("title")}
          formikProps={formik.getFieldProps("details.title")}
        />
        <InputText
          label={t("subtitle")}
          formikProps={formik.getFieldProps("details.subtitle")}
        />
      </SidebarSection>

      <SidebarSection label={t("answerKeys")}>
        <InputSwitch
          label={t("isPerPageAnswers")}
          checked={formik.values.settings.answers.isPerPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isPerPage", e.value)
          }
        />
        <InputSwitch
          label={t("isLastPageAnswers")}
          checked={formik.values.settings.answers.isLastPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isLastPage", e.value)
          }
        />
      </SidebarSection>

      <SidebarSection label={t("colors")}>
        <InputColor
          label={t("lineColor")}
          color={formik.values.settings?.colors?.border}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.border", `#${e.value}`)
          }
        />
        <InputColor
          label={t("titleColor")}
          color={formik.values.settings?.colors?.title}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.title", `#${e.value}`)
          }
        />
        <InputColor
          label={t("subtitleColor")}
          color={formik.values.settings?.colors?.subtitle}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.subtitle", `#${e.value}`)
          }
        />
        <InputColor
          label={t("questionNumberColor")}
          color={formik.values.settings?.colors?.questionNumber}
          onChange={(e) =>
            formik.setFieldValue(
              "settings.colors.questionNumber",
              `#${e.value}`
            )
          }
        />
        <InputColor
          label={t("pageNumberColor")}
          color={formik.values.settings?.colors?.pageNumber}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.pageNumber", `#${e.value}`)
          }
        />
        <InputColor
          label={t("pageAnswerColor")}
          color={formik.values.settings?.colors?.pageAnswer}
          onChange={(e) =>
            formik.setFieldValue("settings.colors.pageAnswer", `#${e.value}`)
          }
        />
      </SidebarSection>
    </div>
  );
}
