"use client";

export function handleGetImageMeta(
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
        ratio: img.height / img.width + 0.1,
      });
    };
  });
}

export function base64ToFile(base64Data: string): File {
  const [meta, data] = base64Data.split(",");
  const byteString = atob(data);
  const mimeString = meta.split(":")[1].split(";")[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  const file = new File([uintArray], "fileName", { type: mimeString });

  return file;
}
