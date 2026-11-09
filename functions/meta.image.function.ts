import { IQuestionImage } from "@/interfaces/pdf.question.interface";

const RATIO_PADDING = 0.1;
const MAX_EDGE = 2400;
const SVG_TARGET_EDGE = 1600;
const SVG_FALLBACK_SIZE = { width: 1024, height: 768 };
const JPEG_FALLBACK_THRESHOLD = 3_000_000;

interface IDecoded {
  source: CanvasImageSource;
  width: number;
  height: number;
  isVector: boolean;
  release: () => void;
}

export function toQuestionImage(
  base64: string,
  width: number,
  height: number
): IQuestionImage {
  return { base64, width, height, ratio: height / width + RATIO_PADDING };
}

function isSvg(blob: Blob, name?: string): boolean {
  return blob.type === "image/svg+xml" || /\.svg$/i.test(name ?? "");
}

function loadImageElement(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image could not be decoded"));
    };
    img.src = url;
  });
}

async function decode(blob: Blob, name?: string): Promise<IDecoded> {
  const vector = isSvg(blob, name);

  if (!vector && typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob, {
        imageOrientation: "from-image",
      });

      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        isVector: false,
        release: () => bitmap.close(),
      };
    } catch {
      // fall back to an <img> element below
    }
  }

  const typed =
    vector && blob.type !== "image/svg+xml"
      ? new Blob([blob], { type: "image/svg+xml" })
      : blob;
  const img = await loadImageElement(typed);

  return {
    source: img,
    width: img.naturalWidth || (vector ? SVG_FALLBACK_SIZE.width : 0),
    height: img.naturalHeight || (vector ? SVG_FALLBACK_SIZE.height : 0),
    isVector: vector,
    release: () => {},
  };
}

/**
 * Re-encodes any browser-decodable image as a clean, upright PNG (or JPEG when
 * the PNG gets huge). The PDF renderer only understands real PNG/JPEG data, so
 * everything else (WebP, GIF, BMP, AVIF, SVG, mislabelled files, EXIF-rotated
 * photos, palette PNGs with transparency) is normalised here.
 */
export async function blobToQuestionImage(
  blob: Blob,
  name?: string
): Promise<IQuestionImage> {
  const decoded = await decode(blob, name);

  try {
    if (!decoded.width || !decoded.height) {
      throw new Error("Image has no size");
    }

    const scale = decoded.isVector
      ? SVG_TARGET_EDGE / Math.max(decoded.width, decoded.height)
      : Math.min(1, MAX_EDGE / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(decoded.source, 0, 0, width, height);

    let base64 = canvas.toDataURL("image/png");
    if (base64.length > JPEG_FALLBACK_THRESHOLD) {
      base64 = canvas.toDataURL("image/jpeg", 0.92);
    }

    return toQuestionImage(base64, width, height);
  } finally {
    decoded.release();
  }
}

export function fileToQuestionImage(file: File): Promise<IQuestionImage> {
  return blobToQuestionImage(file, file.name);
}

export function isPdfSafeDataUrl(base64: string): boolean {
  return /^data:image\/(png|jpeg);base64,/i.test(base64);
}

export async function dataUrlToQuestionImage(
  base64: string
): Promise<IQuestionImage> {
  const response = await fetch(base64);
  return blobToQuestionImage(await response.blob());
}

