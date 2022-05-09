import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Header } from "../Header";

import { Loading } from "../Loading";

import { ToastContainer } from "../ToastContainer";

export function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoadingLogin(true);
      if (user.trim() === "" || password.trim() === "") {
        toast.warning("Username and Password are required!");
        return;
      }
      if (
        user !== import.meta.env.VITE_USER &&
        password !== import.meta.env.VITE_PASSWORD
      ) {
        toast.warning("Username or Password invalid!");
        return;
      }
      localStorage.setItem("user-drinkshome", JSON.stringify({ user }));
      navigate("/feedbacks/admin");
    } catch (error) {
      toast.error("Sorry, an error occurred during execution!");
    } finally {
      setIsLoadingLogin(false);
    }
  }
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[100vh] w-full flex-col">
        <h1 className="text-brand-500 text-4xl font-semibold mb-6">
          DrinksAtHome
        </h1>
        <p className="text-zinc-400 mb-6">Enter your details to access.</p>
        <form className="w-[30%] flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="
            text-sm
            h-10
            placeholder-zinc-400
            dark:text-zinc-100 text-zinc-800
            border-zinc-600
            bg-transparent
            rounded-md
            resize-none
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1  
            focus:outline-none
            scrollbar-thumb-zinc-700
            scrollbar-track-transparent
            scrollbar-thin
            "
            placeholder="Type your e-mail"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            className="
            text-sm
            h-10
            placeholder-zinc-400
            dark:text-zinc-100 text-zinc-800
            border-zinc-600
            bg-transparent
            rounded-md
            resize-none
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1  
            focus:outline-none
            scrollbar-thumb-zinc-700
            scrollbar-track-transparent
            scrollbar-thin
            "
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="
          p-2
          bg-brand-500
          rounded-md
          border-transparent
          flex-1
          flex
          justify-center
          items-center
          text-sm
          hover:bg-brand-300
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-zinc-900
          focus:ring-brand-500
          transition-colors
          disabled:opacity-50
          disabled:hover:bg-brand-500
          disabled:cursor-not-allowed
      "
            type="submit"
            disabled={isLoadingLogin}
          >
            {isLoadingLogin ? <Loading /> : "Log in"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
