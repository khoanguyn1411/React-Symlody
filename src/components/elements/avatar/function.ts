/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { v4 } from "uuid";

const getBlobFromCanvas = (
    canvas: HTMLCanvasElement,
    file: File
): Promise<Blob> =>
    new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                //@ts-ignore
                blob.name = v4() + "." + file.type.replace("image/", "");
                //@ts-ignore
                blob.lastModified = file.lastModified;
                resolve(blob);
            } else {
                reject(new Error("Canvas is empty"));
            }
        }, file.type); //"image/jpeg");
    });

function getResizedCanvas(
    canvas: HTMLCanvasElement,
    newWidth: number,
    newHeight: number
) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        newWidth,
        newHeight
    );

    return tmpCanvas;
}

async function cropImage(image: HTMLImageElement, file, crop) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );

    // return await getBlobFromCanvas(canvas, file);
    return await getBlobFromCanvas(getResizedCanvas(canvas, 128, 128), file);
}

export default cropImage;
