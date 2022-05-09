import { useState } from "react";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problem",
    image: {
      source: bugImageUrl,
      alt: "Image of an insect",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Image of an light bulb",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: thoughtImageUrl,
      alt: "Image of a thought bubble",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }
  return (
    <div
      className="
      dark:bg-zinc-900 
      bg-white
      p-4 
      relative 
      rounded-2xl
      mb-4
      flex
      flex-col
      items-center
      shadow-lg
      w-[calc(100vw-2rem)]
      md:w-auto
      "
    >
      {feedbackSent ? (
        <FeedBackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedBackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedBackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-500 dark:text-neutral-400">
        Made with ♥ by{" "}
        <a
          href="https://www.rocketseat.com.br/"
          className="underline underline-offset-2"
          target="_blank"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
