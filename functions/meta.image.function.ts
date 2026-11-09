import { IQuestionImage } from "@/interfaces/pdf.question.interface";
import { convertBase64 } from "./convertbase64.function";

const RATIO_PADDING = 0.1;

export function getImageSize(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Image could not be loaded"));
    img.src = src;
  });
}

export function toQuestionImage(
  base64: string,
  width: number,
  height: number
): IQuestionImage {
  return { base64, width, height, ratio: height / width + RATIO_PADDING };
}

export async function fileToQuestionImage(file: File): Promise<IQuestionImage> {
  const base64 = await convertBase64(file);
  const { width, height } = await getImageSize(base64);

  return toQuestionImage(base64, width, height);
}
