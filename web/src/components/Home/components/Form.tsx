import { FormEvent } from "react";

import { MagnifyingGlass } from "phosphor-react";

interface Props {
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  value: string;
  setValue: (value: string) => void;
}
export function FormComponent({ onSubmit, setValue, value }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className=" flex flex-row justify-center mt-4 mb-20"
    >
      <div className="mb-4 flex w-[50rem] flex-col justify-end mx-2">
        <input
          className="placeholder:italic shadow py-2 px-4 h-[40px] appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="search-drink"
          value={value}
          type="text"
          placeholder="Search drink..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex items-center justify-center w-[50%] self-end mt-2 bg-brand-500 hover:bg-brand-300 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <MagnifyingGlass className="mr-2" />
          Find drink
        </button>
      </div>
    </form>
  );
}
