import { Icon } from "@iconify/react";
import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/channels",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

export default function Home() {
  const signInGoogle = () => {
    console.log("signed in");
    signIn("google")
      .then((error) => signInError())
      .catch((error) => signInError());
  };
  const signInGithub = () => {
    console.log("signed in");
    signIn("github")
      .then((error) => signInError())
      .catch((error) => signInError());
  };

  const signInError = () => {
    toast.error("Try with another sign-in method!");
  };

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

          {/* oauth */}
          <button
            onClick={signInGoogle}
            className="bg-blue-600 rounded-md py-2 px-6 w-full flex items-center mb-4 justify-center hover:bg-blue-800 transition ease-in"
          >
            <Icon icon="flat-color-icons:google" className="mr-2 text-lg" />
            Login with Google
          </button>
          <button
            onClick={signInGithub}
            className="bg-blue-600 rounded-md py-2 px-6 w-full flex items-center justify-center hover:bg-blue-800 transition ease-in"
          >
            <Icon icon="akar-icons:github-fill" className="mr-2 text-lg" />
            Login with Github
          </button>
        </div>
      </main>
    </div>
  );
}
