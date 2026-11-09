import { IQuestionImage } from "@/interfaces/pdf.question.interface";

const RATIO_PADDING = 0.1;
const MAX_EDGE = 2400;
const MIN_EDGE_AFTER_SHRINK = 900;
const SHRINK_FACTOR = 0.8;
const SVG_TARGET_EDGE = 1600;
const SVG_FALLBACK_SIZE = { width: 1024, height: 768 };
const JPEG_FALLBACK_THRESHOLD = 3_000_000;
const JPEG_QUALITY = 0.92;
const TAIL_BYTES = 64;

type ImageKind = "png" | "jpeg" | "svg" | "tiff" | "heic" | "other";

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

const HEIC_BRANDS = new Set([
  "heic",
  "heix",
  "hevc",
  "hevx",
  "heim",
  "heis",
  "hevm",
  "hevs",
  "mif1",
  "msf1",
]);

function ascii(bytes: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...bytes.slice(start, end));
}

async function detectKind(blob: Blob, name?: string): Promise<ImageKind> {
  const head = new Uint8Array(await blob.slice(0, 16).arrayBuffer());

  if (head[0] === 0x89 && ascii(head, 1, 4) === "PNG") return "png";
  if (head[0] === 0xff && head[1] === 0xd8) return "jpeg";
  if (
    (ascii(head, 0, 2) === "II" && head[2] === 0x2a && head[3] === 0) ||
    (ascii(head, 0, 2) === "MM" && head[2] === 0 && head[3] === 0x2a)
  ) {
    return "tiff";
  }
  if (ascii(head, 4, 8) === "ftyp" && HEIC_BRANDS.has(ascii(head, 8, 12))) {
    return "heic";
  }
  if (blob.type === "image/svg+xml" || /\.svg$/i.test(name ?? "")) {
    return "svg";
  }

  return "other";
}

async function tail(blob: Blob): Promise<Uint8Array> {
  const start = Math.max(0, blob.size - TAIL_BYTES);
  return new Uint8Array(await blob.slice(start).arrayBuffer());
}

function contains(bytes: Uint8Array, sequence: number[]): boolean {
  for (let i = 0; i <= bytes.length - sequence.length; i++) {
    if (sequence.every((value, j) => bytes[i + j] === value)) return true;
  }
  return false;
}

/**
 * Browsers happily draw the readable part of a cut-off file, which would end
 * up as a half image in the PDF. PNG must end with its IEND chunk and JPEG
 * with its end-of-image marker.
 */
async function assertComplete(blob: Blob, kind: ImageKind): Promise<void> {
  if (kind === "png" && !contains(await tail(blob), [0x49, 0x45, 0x4e, 0x44])) {
    throw new Error("PNG file is truncated");
  }

  if (kind === "jpeg" && !contains(await tail(blob), [0xff, 0xd9])) {
    throw new Error("JPEG file is truncated");
  }
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

function parseLength(value: string | null): number {
  if (!value) return 0;
  if (!/^\s*[\d.]+\s*(px)?\s*$/i.test(value)) return 0;
  return Number.parseFloat(value) || 0;
}

/**
 * SVGs without a usable size or viewBox are drawn at their natural scale in the
 * top-left corner of a default-sized canvas. Give them an explicit viewBox that
 * wraps their content so they fill the image.
 */
async function normalizeSvg(blob: Blob): Promise<Blob> {
  const doc = new DOMParser().parseFromString(
    await blob.text(),
    "image/svg+xml"
  );
  const svg = doc.documentElement;

  if (svg.nodeName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) {
    return new Blob([blob], { type: "image/svg+xml" });
  }

  const viewBox = (svg.getAttribute("viewBox") ?? "")
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  const hasViewBox =
    viewBox.length === 4 &&
    viewBox.every(Number.isFinite) &&
    viewBox[2] > 0 &&
    viewBox[3] > 0;
  const width = parseLength(svg.getAttribute("width"));
  const height = parseLength(svg.getAttribute("height"));

  if (hasViewBox) {
    svg.setAttribute("width", String(viewBox[2]));
    svg.setAttribute("height", String(viewBox[3]));
  } else if (width > 0 && height > 0) {
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  } else {
    const host = document.createElement("div");
    host.style.cssText =
      "position:fixed;left:-99999px;top:0;width:0;height:0;overflow:hidden;visibility:hidden";
    const probe = document.importNode(svg, true) as unknown as SVGSVGElement;
    host.appendChild(probe);
    document.body.appendChild(host);

    try {
      const box = probe.getBBox();
      if (box.width > 0 && box.height > 0) {
        const pad = Math.max(box.width, box.height) * 0.02;
        const x = box.x - pad;
        const y = box.y - pad;
        const w = box.width + pad * 2;
        const h = box.height + pad * 2;
        svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
        svg.setAttribute("width", String(w));
        svg.setAttribute("height", String(h));
      }
    } finally {
      host.remove();
    }
  }

  return new Blob([new XMLSerializer().serializeToString(svg)], {
    type: "image/svg+xml",
  });
}

async function decodeTiff(blob: Blob): Promise<IDecoded> {
  const UTIF = await import("utif2");
  const buffer = await blob.arrayBuffer();
  const [ifd] = UTIF.decode(buffer);
  if (!ifd) throw new Error("TIFF has no image");

  UTIF.decodeImage(buffer, ifd);
  const rgba = UTIF.toRGBA8(ifd);

  const canvas = document.createElement("canvas");
  canvas.width = ifd.width;
  canvas.height = ifd.height;
  canvas
    .getContext("2d")
    ?.putImageData(
      new ImageData(new Uint8ClampedArray(rgba), ifd.width, ifd.height),
      0,
      0
    );

  return {
    source: canvas,
    width: ifd.width,
    height: ifd.height,
    isVector: false,
    release: () => {},
  };
}

async function decodeHeic(blob: Blob): Promise<IDecoded> {
  const { heicTo } = await import("heic-to/next");
  const bitmap = await heicTo({
    blob,
    type: "bitmap",
    options: { imageOrientation: "from-image" },
  });

  return {
    source: bitmap,
    width: bitmap.width,
    height: bitmap.height,
    isVector: false,
    release: () => bitmap.close(),
  };
}

async function decode(blob: Blob, kind: ImageKind): Promise<IDecoded> {
  const vector = kind === "svg";

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
      // fall back to a dedicated decoder or an <img> element below
    }
  }

  if (kind === "tiff") return decodeTiff(blob);
  if (kind === "heic") return decodeHeic(blob);

  const img = await loadImageElement(vector ? await normalizeSvg(blob) : blob);

  return {
    source: img,
    width: img.naturalWidth || (vector ? SVG_FALLBACK_SIZE.width : 0),
    height: img.naturalHeight || (vector ? SVG_FALLBACK_SIZE.height : 0),
    isVector: vector,
    release: () => {},
  };
}

function render(
  source: CanvasImageSource,
  width: number,
  height: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(source, 0, 0, width, height);

  return canvas;
}

/**
 * Re-encodes any browser-decodable image as a clean, upright PNG. Noisy images
 * that would make a huge PNG become JPEG, and are scaled down step by step
 * until they fit a sensible size.
 */
function encode(
  source: CanvasImageSource,
  baseWidth: number,
  baseHeight: number
): IQuestionImage {
  let width = baseWidth;
  let height = baseHeight;

  for (;;) {
    const canvas = render(source, width, height);

    const png = canvas.toDataURL("image/png");
    if (png.length <= JPEG_FALLBACK_THRESHOLD) {
      return toQuestionImage(png, width, height);
    }

    const jpeg = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    const canShrink = Math.max(width, height) * SHRINK_FACTOR >= MIN_EDGE_AFTER_SHRINK;
    if (jpeg.length <= JPEG_FALLBACK_THRESHOLD || !canShrink) {
      return toQuestionImage(jpeg, width, height);
    }

    width = Math.max(1, Math.round(width * SHRINK_FACTOR));
    height = Math.max(1, Math.round(height * SHRINK_FACTOR));
  }
}

/**
 * The PDF renderer only understands real PNG/JPEG data, so everything else
 * (WebP, GIF, BMP, AVIF, TIFF, HEIC, SVG, mislabelled files, EXIF-rotated
 * photos, palette PNGs with transparency) is normalised here.
 */
export async function blobToQuestionImage(
  blob: Blob,
  name?: string
): Promise<IQuestionImage> {
  const kind = await detectKind(blob, name);
  await assertComplete(blob, kind);

  const decoded = await decode(blob, kind);

  try {
    if (!decoded.width || !decoded.height) {
      throw new Error("Image has no size");
    }

    const scale = decoded.isVector
      ? SVG_TARGET_EDGE / Math.max(decoded.width, decoded.height)
      : Math.min(1, MAX_EDGE / Math.max(decoded.width, decoded.height));

    return encode(
      decoded.source,
      Math.max(1, Math.round(decoded.width * scale)),
      Math.max(1, Math.round(decoded.height * scale))
    );
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
