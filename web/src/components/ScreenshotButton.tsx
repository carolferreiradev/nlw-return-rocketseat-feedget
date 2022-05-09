import { useState } from "react";

import html2canvas from "html2canvas";

import { Camera, Trash } from "phosphor-react";

import { Loading } from "./Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenShot: string | null) => void;
}

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakeScreenshot] = useState(false);
  async function handleTakeScreenshot() {
    try {
      setIsTakeScreenshot(true);
      const canvas = await html2canvas(document.querySelector("html")!);
      const base64image = canvas.toDataURL("image/png");
      onScreenshotTook(base64image);
    } catch (error) {
      alert("Ocorreu um erro ao tentar tirar um print da tela!");
    } finally {
      setIsTakeScreenshot(false);
    }
  }
  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1
        w-10
        h-10
        rounded-md
        border-transparent
        flex
        justify-end
        items-end
        dark:text-zinc-400
        text-zinc-500
        hover:text-zinc-100
        transition-colors
        "
        style={{
          backgroundImage: `url(${screenshot})`,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button
      onClick={handleTakeScreenshot}
      type="button"
      className="
              p-2 
              dark:bg-zinc-800
              bg-zinc-100 
              rounded-md 
              border-transparent
            hover:bg-zinc-700
              transition-colors
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-zinc-900
              focus:ring-brand-500
              "
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 dark:text-zinc-100 text-zinc-800" />
      )}
    </button>
  );
}
