"use client";

import { ReactElement, useRef } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { toQuestionImage } from "@/functions/meta.image.function";
import useApp from "@/hooks/useApp";

interface IEditorModal {
  id: string;
  image: string;
  onHide: () => void;
}

export default function EditorModal({
  id,
  image,
  onHide,
}: IEditorModal): ReactElement {
  const { handleReplaceQuestion } = useApp();
  const { t } = useTranslation();

  const ref = useRef<CropperRef>(null);

  function handleSave() {
    const canvas = ref.current?.getCanvas();
    if (!canvas) return;

    handleReplaceQuestion(
      id,
      toQuestionImage(canvas.toDataURL("image/png"), canvas.width, canvas.height)
    );
    onHide();
  }

  return (
    <Modal
      size="lg"
      header={
        <h2 className="text-xl font-semibold">
          {t("editQuestion")}
        </h2>
      }
      footer={
        <>
          <Button variant="secondary" label={t("cancel")} onClick={onHide} />
          <Button label={t("save")} onClick={handleSave} />
        </>
      }
      onHide={onHide}
    >
      <div className="h-[55dvh] w-full overflow-hidden rounded-lg">
        <Cropper
          ref={ref}
          src={image}
          className="h-full w-full bg-default"
        />
      </div>
    </Modal>
  );
}
