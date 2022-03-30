import { Icon } from "@iconify/react";
import { useContext, useEffect, useState, useRef } from "react";
import Head from "next/head";
import Message from "../components/Message";
import { messages } from "../data/messages";
import { AppContext } from "../components/Layout";
import Drawer from "../components/Drawer";
import ChannelModal from "../components/ChannelModal";
import { getSession } from "next-auth/react";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { useRouter } from "next/router";
import getDate from "../utils/getDate";
import sortMessagesDate from "../utils/sortMessagesDate";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // get channels
  const channels = await prisma.channel.findMany({
    include: {
      members: true,
    },
  });

  return {
    props: {
      channels: await JSON.parse(JSON.stringify(channels)),
    },
  };
};

export default function ChannelPage({ channels }) {
  const {
    drawer,
    setDrawer,
    drawerToggle,
    setDrawerToggle,
    modal,
    setModal,
    refreshData,
    channelIndex,
    setChannelIndex,
    creatingNewChannel,
    setCreatingNewChannel,
    toast,
    dateBlockShow,
    dateBlock,
    setDateBlock,
  } = useContext(AppContext);

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedMessages, setSortedMessages] = useState([]);
  const [sentMessage, setSentMessage] = useState(false);
  const userInputField = useRef(null);

  const openDrawer = () => {
    setDrawer(true);
  };

  const addUserToChannel = async (channelId) => {
    await axios.patch("/api/user", { channelId: channelId });
  };

  const scrollMessages = () => {
    const messagesDiv = document.getElementById("messages-div");
    messagesDiv.scrollTo({
      top: messagesDiv.scrollHeight, //scroll to the bottom of the element
      behavior: "smooth", //auto, smooth, initial, inherit
    });
  };

  const getMessages = async () => {
    setLoading(true);
    const messagesRes = await axios.get("/api/message", {
      params: { channelId: channels[channelIndex]?.id },
    });

    const messagesData = messagesRes.data.length
      ? sortMessagesDate(messagesRes.data)
      : [];

    console.log(messagesData);

    await setMessages(messagesData);
    setLoading(false);
  };

  const refreshedMessages = async () => {
    console.log("data fetch");
    const messagesRes = await axios.get("/api/message", {
      params: { channelId: channels[channelIndex]?.id },
    });

    // console.log(messagesRes.data.length);
    const messagesData = messagesRes.data.length
      ? sortMessagesDate(messagesRes.data)
      : [];

    await setMessages(messagesData);
  };

  const handleMessageSubmit = async (e) => {
    const res = await axios.post("/api/message", {
      message: userInput,
      channelId: channels[channelIndex]?.id,
    });

    console.log(res);
    if (res.status !== 200) {
      toast.error("failed to send message");
    } else if (res.status === 200) {
      await refreshedMessages();
      await scrollMessages();
    }
    userInputField.current.value = "";
  };

  const formatDate = (dateAndTime) => {
    const date = dateAndTime.slice(0, dateAndTime.indexOf("T"));
    const time = dateAndTime.slice(dateAndTime.indexOf("T") + 1, -8);
    return `${date} at ${time}`;
  };

  // add user to welcome channel initially
  useEffect(() => {
    getMessages();
    if (creatingNewChannel) {
      const latestChannel = channels.length;
      console.log(latestChannel);
      setChannelIndex(latestChannel - 1);
      setCreatingNewChannel(false);
    }
  }, [channels]);

  useEffect(() => {
    getMessages();
    sortMessagesDate(messages);
  }, [channelIndex]);

  // get data every second
  useEffect(() => {
    const interval = setInterval(async () => {
      !loading && !creatingNewChannel && refreshedMessages();
      // !loading && refreshedMessages();
    }, 10000);
    return () => clearInterval(interval);
  }, [channelIndex]);

  return (
    <div className="lg:overflow-y-scroll lg:h-screen lg:flex scrollbar-hidden">
      <Head>
        <title>Chat App | Frontend Devs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modal && <ChannelModal channels={channels} />}

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

            <h1 className="text-md font-semibold mt-0.5 pl-4 lg:pl-0 uppercase">
              {channels[channelIndex]?.name}
            </h1>
          </div>
        </div>

        {/* loading & conversation section */}
        {loading ? (
          <div className="text-blue-500 text-4xl container grid place-items-center mt-12 mb-auto">
            <Icon icon="eos-icons:loading" />
          </div>
        ) : (
          <div
            id="messages-div"
            className="lg:mt-auto px-4 overflow-y-scroll scrollbar-hidden"
          >
            {messages?.length ? (
              messages?.map((item, index) => (
                <div key={index}>
                  {
                    <div className="container flex items-center justify-center">
                      <div className="h-[1px] grow m-auto bg-gray-600" />
                      <span className="text-gray-600 text-sm px-4">
                        {item?.date}
                      </span>
                      <div className="h-[1px] grow m-auto bg-gray-600" />
                    </div>
                  }
                  {item?.messagesOnThisDay?.map((message, index) => (
                    <div key={index} className="lg:container max-w-7xl">
                      <Message
                        name={message.user.name}
                        image={message.user.image}
                        date={formatDate(message.createdAt)}
                        message={message.message}
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mb-4">
                Be the first to start this conversation
              </p>
            )}
          </div>
        )}

        {/* input bar */}
        <div className="fixed lg:sticky bottom-0 left-0 w-full py-4 px-5 bg-zinc-800">
          <div className="w-full py-2 pl-5 pr-2 rounded-lg bg-zinc-600/50 flex justify-between lg:container max-w-7xl">
            <input
              className="bg-transparent outline-none border-none text-white w-full mr-4"
              type="text"
              placeholder="Type a message here"
              name="message"
              id="message-input"
              autoComplete="off"
              ref={userInputField}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleMessageSubmit(e)}
            />
            <button
              className="text-white text-xl bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed w-9 h-9 rounded-lg grid place-content-center"
              disabled={!userInput.trim().length}
              onClick={(e) => handleMessageSubmit(e)}
            >
              <Icon icon="fe:paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
