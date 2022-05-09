import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedBackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedBackTypeStep({
  onFeedbackTypeChanged,
}: FeedBackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6 dark:text-zinc-100 text-zinc-800">
          Leave your feedback
        </span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="
            dark:bg-zinc-800
            bg-zinc-100
            rounded-lg 
            py-5
            w-24
            flex-1
            flex
            flex-col
            items-center
            gap-2
            border-2
            border-transparent
            hover:border-brand-500
            focus:border-brand-500
            focus:outline-none
        "
              type="button"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span className="dark:text-zinc-100 text-zinc-800">
                {value.title}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
