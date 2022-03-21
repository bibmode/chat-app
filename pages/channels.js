import { Icon } from "@iconify/react";
import { useContext, useEffect } from "react";
import Head from "next/head";
import Message from "../components/Message";
import { messages } from "../data/messages";
import { AppContext } from "../components/Layout";
import Drawer from "../components/Drawer";
import ChannelModal from "../components/ChannelModal";
import { getSession } from "next-auth/react";
import { prisma } from "../lib/prisma";
import axios from "axios";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  // const { channel } = ctx.query;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // get channels
  const channels = await prisma.channel.findMany();

  return {
    props: {
      channels: await JSON.parse(JSON.stringify(channels)),
    },
  };
};

export default function ChannelPage({ channels }) {
  const { drawer, setDrawer, drawerToggle, setDrawerToggle, modal, setModal } =
    useContext(AppContext);

  const openDrawer = () => {
    setDrawer(true);
  };

  const addUserToChannel = (channelId) => {
    axios.patch("/api/user", { channelId: channelId });
  };

  // add user to welcome channel initially
  useEffect(() => {
    addUserToChannel("620a5dfa-bfb6-47dd-923f-fee43f3134b7");
    console.log(channels);
  }, []);

  return (
    <div className="lg:overflow-y-scroll lg:h-screen lg:flex scrollbar-hidden">
      <Head>
        <title>Chat App | Frontend Devs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modal && <ChannelModal />}

      {drawer && (
        <Drawer channels={channels} addUserToChannel={addUserToChannel} />
      )}

      <div className="relative pt-16 lg:pt-0 pb-20 lg:pb-0 mx-auto bg-zinc-800 min-h-screen w-full lg:flex lg:flex-col">
        {/* top bar */}
        <div className="fixed z-30 lg:sticky text-gray-50 top-0 left-0 w-full lg:w-auto bg-zinc-800 drop-shadow-lg p-4">
          <div className="lg:container max-w-7xl flex">
            <button onClick={openDrawer} className="text-2xl lg:hidden">
              <Icon icon="charm:menu-hamburger" />
            </button>

            <h1 className="text-md font-semibold mt-0.5 pl-4 lg:pl-0">
              FRONT-END DEVELOPERS
            </h1>
          </div>
        </div>

        <div className="lg:mt-auto px-4 overflow-y-scroll scrollbar-hidden">
          {messages.data?.map((item, index) => (
            <div key={index} className="lg:container max-w-7xl">
              <Message
                name={item.name}
                date={item.date}
                message={item.message}
              />
            </div>
          ))}
        </div>

        {/* input bar */}
        <div className="fixed lg:sticky bottom-0 left-0 w-full py-4 px-5 bg-zinc-800">
          <div className="w-full py-2 pl-5 pr-2 rounded-lg bg-zinc-600/50 flex justify-between lg:container max-w-7xl">
            <input
              className="bg-transparent outline-none border-none text-white"
              type="text"
              placeholder="Type a message here"
              name="message"
              id="message-input"
            />
            <button className="text-white text-xl bg-blue-500 w-9 h-9 rounded-lg grid place-content-center">
              <Icon icon="fe:paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}