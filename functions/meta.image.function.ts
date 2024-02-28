"use client";

export default function handleGetImageMeta(
  file: File
): Promise<{ width: number; height: number; ratio: number }> {
  const imageBlobUrl = URL.createObjectURL(file);

  const img = new Image();

  img.src = imageBlobUrl;

  return new Promise((resolve) => {
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      });
    };
  });
}
