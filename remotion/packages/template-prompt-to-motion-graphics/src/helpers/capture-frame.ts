import type { ComponentType } from "react";

interface CaptureConfig {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export async function captureFrame(
  Component: ComponentType,
  frame: number,
  config: CaptureConfig,
): Promise<string> {
  try {
    const { renderStillOnWeb } = await import("@remotion/web-renderer");
    const blob = await (
      await renderStillOnWeb({
        composition: {
          component: Component,
          id: "frame-capture",
          width: config.width,
          height: config.height,
          fps: config.fps,
          durationInFrames: config.durationInFrames,
        },
        frame,
        scale: 0.5,
        inputProps: {},
      })
    ).blob({ format: "jpeg" });

    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return "";
  }
}

/**
 * Converts a File to a base64 data URL.
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
