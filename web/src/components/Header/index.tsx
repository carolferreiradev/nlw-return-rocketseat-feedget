import { Link } from "react-router-dom";

import { Graph, Martini, User, UserCirclePlus } from "phosphor-react";

interface Props {
  login?: boolean;
  dashboard?: boolean;
  insertUser?: boolean;
}

export function Header({ dashboard, insertUser, login }: Props) {
  return (
    <div className="h-20 bg-purple-50 dark:bg-purple-900 ">
      <div className=" h-20 max-w-[1500px] flex items-center justify-between px-4 mx-auto">
        <Link to="/">
          <h1 className="md:text-3xl text-xl flex items-center font-bold justify-center gap-2 text-brand-500 dark:text-purple-50">
            <Martini weight="bold" /> DrinksAtHome
          </h1>
        </Link>
        <div className="flex justify-start items-center">
          {login && (
            <Link to="/feedbacks/login">
              <button className="px-3 h-12 dark:text-white hover:underline text-black flex items-center group hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                <User className="mr-2" />
                Login
              </button>
            </Link>
          )}

          {dashboard && (
            <Link to="/feedbacks/admin">
              <button className="px-3 h-12 dark:text-white hover:underline text-black flex items-center group hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                <Graph className="mr-2" />
                Dashboard
              </button>
            </Link>
          )}

          {insertUser && (
            <Link to="">
              <button className="px-3 h-12 dark:text-white hover:underline text-black flex items-center group hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                <UserCirclePlus className="mr-2" />
                Register user
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
