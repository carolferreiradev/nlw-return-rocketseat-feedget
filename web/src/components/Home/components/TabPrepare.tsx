import { Tab } from "@headlessui/react";

import { classNames } from "..";

export function TabPrepare() {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
          selected
            ? "bg-white shadow"
            : "text-purple-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      Prepare mode
    </Tab>
  );
}
