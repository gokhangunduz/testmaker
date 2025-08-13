import { Fragment, ReactElement, useRef } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import {
  IQuestionBase64,
  IQuestionIndex,
} from "@/interfaces/pdf.question.interface";
import "react-advanced-cropper/dist/style.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {
  base64ToFile,
  handleGetImageMeta,
} from "@/functions/meta.image.function";
import useApp from "@/hooks/useApp";
import { convertBase64 } from "@/functions/convertbase64.function";
import { useTranslation } from "react-i18next";

interface IEditorModal {
  onHide: () => void;
  image: IQuestionBase64;
  index: IQuestionIndex;
}

export default function EditorModal({
  onHide,
  image,
  index,
}: IEditorModal): ReactElement {
  const { handleReplaceQuestion } = useApp();
  const { t } = useTranslation();

  const ref = useRef<CropperRef>(null);

  async function handleSaver() {
    const img = ref.current?.getCanvas()?.toDataURL();
    const file = base64ToFile(img!);
    const { width, height, ratio } = await handleGetImageMeta(file);

    handleReplaceQuestion(
      index,
      URL.createObjectURL(file),
      await convertBase64(file),
      width,
      height,
      ratio,
      undefined
    );
  }

  return (
    <Modal
      size="4xl"
      header={
        <h2 className="text-xl font-semibold text-slate-700">
          {t("editQuestion")}
        </h2>
      }
      footer={
        <Fragment>
          <Button color="secondary" label={t("cancel")} onClick={onHide} />
          <Button label={t("save")} onClick={handleSaver} />
        </Fragment>
      }
      onHide={onHide}
    >
      <div>
        <Cropper
          // @ts-ignore
          ref={ref}
          src={image}
          style={{ background: "#DDD" }}
          className="w-full h-full"
        />
      </div>
    </Modal>
  );
}
