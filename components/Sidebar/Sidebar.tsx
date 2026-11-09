"use client";

import { ReactElement } from "react";
import { MdRestartAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";
import SidebarSection from "../SidebarSection/SidebarSection";
import InputSwitch from "../InputSwitch/InputSwitch";
import InputColor from "../InputColor/InputColor";
import InputText from "../InputText/InputText";
import useApp from "@/hooks/useApp";
import Button from "../Button/Button";
import { ISettings } from "@/interfaces/pdf.settings.interface";

type ColorKey = keyof ISettings["colors"];

const colorFields: { key: ColorKey; label: string }[] = [
  { key: "border", label: "lineColor" },
  { key: "title", label: "titleColor" },
  { key: "subtitle", label: "subtitleColor" },
  { key: "questionNumber", label: "questionNumberColor" },
  { key: "pageNumber", label: "pageNumberColor" },
  { key: "pageAnswer", label: "pageAnswerColor" },
];

export default function Sidebar(): ReactElement {
  const { settings, setSettings, handleResetSettings } = useApp();
  const { t } = useTranslation();

  const setDetail = (key: keyof ISettings["details"], value: string) =>
    setSettings((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }));

  const setAnswer = (key: keyof ISettings["answers"], value: boolean) =>
    setSettings((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));

  const setColor = (key: ColorKey, value: string) =>
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-8 p-4 sm:p-6 xl:max-w-none">
      <SidebarSection label={t("titles")} gap={4}>
        <InputText
          label={t("title")}
          placeholder={t("titlePlaceholder")}
          maxLength={80}
          value={settings.details.title}
          onChange={(value) => setDetail("title", value)}
        />
        <InputText
          label={t("subtitle")}
          placeholder={t("subtitlePlaceholder")}
          maxLength={120}
          value={settings.details.subtitle}
          onChange={(value) => setDetail("subtitle", value)}
        />
      </SidebarSection>

      <SidebarSection label={t("answerKeys")}>
        <InputSwitch
          label={t("isPerPageAnswers")}
          checked={settings.answers.isPerPage}
          onChange={(value) => setAnswer("isPerPage", value)}
        />
        <InputSwitch
          label={t("isLastPageAnswers")}
          checked={settings.answers.isLastPage}
          onChange={(value) => setAnswer("isLastPage", value)}
        />
      </SidebarSection>

      <SidebarSection label={t("colors")}>
        {colorFields.map(({ key, label }) => (
          <InputColor
            key={key}
            label={t(label)}
            color={settings.colors[key]}
            onChange={(value) => setColor(key, value)}
          />
        ))}
      </SidebarSection>

      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          icon={<MdRestartAlt size={18} />}
          label={t("resetSettings")}
          onClick={handleResetSettings}
          fullWidth
        />
        <p className="text-xs text-muted">{t("projectSaved")}</p>
      </div>
    </div>
  );
}
