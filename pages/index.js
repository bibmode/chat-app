import { Icon } from "@iconify/react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat App | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-zinc-800 w-screen h-screen grid place-items-center ">
        {/* login div */}
        <div className="text-gray-50 w-3/4 max-w-sm py-12 px-8 bg-zinc-900 text-center rounded-xl">
          <h1 className="font-semibold text-xl">Gen&apos;s Chat App</h1>
          <p className="text-sm mt-3 mb-8 text-left">
            This is my solution for devchallenge.io Chat App challenge. You can
            login using the dummy email below or by your own google/github
            account to check it out!
          </p>

          {/* email */}
          <form>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="rounded-lg bg-zinc-700 mb-4 py-3 px-4 outline-none border-none w-full text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 rounded-md py-2 px-6 w-full hover:bg-blue-800 transition ease-in"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-between my-4">
            <div className="w-2/5 h-[1px] bg-gray-500" />
            <span className="text-gray-400">or</span>
            <div className="w-2/5 h-[1px] bg-gray-500" />
          </div>

          {/* oauth */}
          <button className="bg-blue-600 rounded-md py-2 px-6 w-full flex items-center mb-4 justify-center hover:bg-blue-800 transition ease-in">
            <Icon icon="flat-color-icons:google" className="mr-2 text-lg" />
            Login with Google
          </button>
          <button className="bg-blue-600 rounded-md py-2 px-6 w-full flex items-center justify-center hover:bg-blue-800 transition ease-in">
            <Icon icon="akar-icons:github-fill" className="mr-2 text-lg" />
            Login with Github
          </button>
        </div>
      </main>
    </div>
  );
}
