import { Martini } from "phosphor-react";

export function HeaderComponent() {
  return (
    <>
      <h1 className="flex flex-row justify-center items-center md:text-5xl text-3xl my-10 text-brand-500 font-bold">
        <Martini weight="bold" className="mr-2" />
        DrinksAtHome
      </h1>
      <p className="text-center dark:text-zinc-100 text-zinc-800">
        Find the best drink recipes and make them in the comfort of your own
        home.
      </p>
    </>
  );
}
