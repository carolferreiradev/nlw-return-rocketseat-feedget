import { FormEvent, useState } from "react";

import { apiCocktail } from "../../services/api";

import { Header } from "../Header";

import { Tab } from "@headlessui/react";

import { Loading } from "../Loading";

import { ToastContainer } from "../ToastContainer";
import { toast } from "react-toastify";

import { HeaderComponent } from "./components/Header";
import { FormComponent } from "./components/Form";
import { TabIngredient } from "./components/TabIngredient";
import { TabPrepare } from "./components/TabPrepare";
import { BearImage } from "./components/BearImage";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface DrinkProps {
  id: string;
  name: string;
  ingredients: string[];
  prepare: string;
  image: string;
}

export function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [drinksList, setDrinksList] = useState<DrinkProps[]>([]);
  const [isLoadingDrinks, setIsLoadingDrinks] = useState(false);

  async function getDrinks(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoadingDrinks(true);
      const { data } = await apiCocktail.get(`search.php?s=${searchValue}`);
      if (data.drinks) {
        const drinksMapped = data.drinks.map((drink) => {
          const ingredients = [];
          for (let index = 1; index < 15; index++) {
            if (drink[`strIngredient${index}`]) {
              ingredients.push(drink[`strIngredient${index}`]);
            }
          }
          return {
            id: drink.idDrink,
            name: drink.strDrink,
            ingredients,
            prepare: drink.strInstructions,
            image: drink.strDrinkThumb,
          };
        });
        setDrinksList(drinksMapped);
      } else {
        setDrinksList([]);
        toast.info("Drinks not found!");
      }
    } catch (error) {
      toast.error("Sorry, an error occurred during execution!");
    } finally {
      setIsLoadingDrinks(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <Header login />
      <div className="max-w-[1500px] w-full mx-auto flex flex-col">
        <div className="flex flex-col justify-center items-center mx-2">
          <HeaderComponent />
        </div>
        <FormComponent
          onSubmit={getDrinks}
          value={searchValue}
          setValue={setSearchValue}
        />

        <div className="flex flex-row flex-wrap justify-center items-center gap-8 m-3">
          {isLoadingDrinks ? (
            <Loading />
          ) : (
            <>
              {drinksList.map((drink) => (
                <div
                  key={drink.id}
                  className="dark:bg-zinc-800
                  bg-zinc-100 shadow-md rounded
                  px-8 pt-6 pb-8 mb-4 p-4
                  h-[550px]
                  w-[400px]
                  overflow-auto
                  scrollbar-thumb-zinc-200
                  dark:scrollbar-thumb-zinc-700
                  scrollbar-track-transparent
                  scrollbar-thin"
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-[full] rounded-lg"
                  />
                  <h2 className="text-2xl my-4 dark:text-zinc-100 text-zinc-800 text-center font-bold">
                    {drink.name}
                  </h2>
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-purple-900/20 p-1">
                      <TabIngredient />
                      <TabPrepare />
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <ul className="dark:text-zinc-100 text-zinc-800">
                          {drink.ingredients.map((ingredient, index) => (
                            <li key={ingredient}>
                              <strong>{index + 1}:</strong> {ingredient}
                            </li>
                          ))}
                        </ul>
                      </Tab.Panel>
                      <Tab.Panel className="dark:text-zinc-100 text-zinc-800 p-2 rounded-md">
                        {drink.prepare}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              ))}
            </>
          )}
        </div>
        {drinksList.length <= 0 && <BearImage />}
      </div>
    </>
  );
}
