"use client";

import SidebarSection from "../SidebarSection/SidebarSection";
import InputSwitch from "../InputSwitch/InputSwitch";
import { ReactElement, useEffect } from "react";
import InputText from "../InputText/InputText";
import useApp from "@/hooks/useApp";
import { useFormik } from "formik";

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
          label="Is Per Page"
          checked={formik.values.settings.answers.isPerPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isPerPage", e.value)
          }
        />
        <InputSwitch
          label="Is Last Page"
          checked={formik.values.settings.answers.isLastPage}
          onChange={(e) =>
            formik.setFieldValue("settings.answers.isLastPage", e.value)
          }
        />
      </SidebarSection>
    </div>
  );
}
