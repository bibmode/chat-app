import { Icon } from "@iconify/react";
import { useContext, useEffect, useState, useRef } from "react";
import Head from "next/head";
import Message from "../components/Message";
import { AppContext } from "../components/Layout";
import Drawer from "../components/Drawer";
import ChannelModal from "../components/ChannelModal";
import { getSession, useSession } from "next-auth/react";
import { prisma } from "../lib/prisma";
import axios from "axios";
import sortMessagesDate from "../utils/sortMessagesDate";
import MessageLoader from "../components/loaders/MessageLoader";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // get channels
  const channelRes = await prisma.channel.findMany({
    include: {
      members: true,
    },
  });
  const initialChannels = await JSON.parse(JSON.stringify(channelRes));
  // console.log(initialChannels);

  const messagesRes = await prisma.channel.findFirst({
    where: { id: initialChannels[0].id },
    select: {
      messages: true, // Return all fields
    },
  });

  const initialMessages = await JSON.parse(JSON.stringify(messagesRes));
  console.log(initialMessages);

  return {
    props: {
      initialChannels,
      initialMessages: initialMessages.messages,
    },
  };
};

export default function ChannelPage({ initialChannels, initialMessages }) {
  const {
    drawer,
    setDrawer,
    modal,
    channelIndex,
    setChannelIndex,
    creatingNewChannel,
    setCreatingNewChannel,
    toast,
    loading,
    setLoading,
    setChannels,
    channels,
    messages,
    setMessages,
    sending,
    setSending,
    setSwitchingChannels,
    switchingChannels,
  } = useContext(AppContext);

  const { data: session } = useSession();

  const [userInput, setUserInput] = useState("");

  const [displayChannels, setDisplayChannels] = useState(channels);
  const [initialLoad, setInitialLoad] = useState(true);

  const userInputField = useRef(null);

  const openDrawer = () => {
    setDrawer(true);
  };

  // set channels on initial reload
  useEffect(() => {
    (async () => {
      if (initialLoad) {
        console.log("initial channels");
        await setChannels(initialChannels);
        await setDisplayChannels(initialChannels);
        await setInitialLoad(false);
      }
    })();

    // if(channels)
  }, [initialChannels]);

  const createChannel = async () => {
    const latestChannel = await channels.length;
    await setChannelIndex(latestChannel - 1);
    await setMessages([]);
    await setCreatingNewChannel(false);
  };

  useEffect(() => {
    console.log("channels");
    if (channels.length !== 0 && !creatingNewChannel) {
      getMessages();
    }

    if (creatingNewChannel) {
      createChannel();
    }
  }, [channels]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // scroll down to div every new message added
  const scrollMessages = () => {
    const messagesDiv = document.getElementById("messages-div");
    messagesDiv?.scrollTo({
      top: messagesDiv.scrollHeight, //scroll to the bottom of the element
      behavior: "smooth", //auto, smooth, initial, inherit
    });
  };

  // retrieving messages loading
  const getMessages = async () => {
    console.log("getMessages");
    await setLoading(true);
    await retrievingMessageData();
    await setLoading(false);
    await scrollMessages();
  };

  // retrieving messages without loading
  const retrievingMessageData = async () => {
    // if (!switchingChannels) {
    const messagesRes = await axios.get("/api/message", {
      params: { channelId: channels[channelIndex]?.id },
    });

    const messagesData = messagesRes.data.length
      ? sortMessagesDate(messagesRes.data)
      : [];

    await setMessages(messagesData);
    // }
  };

  // sending messages
  const handleMessageSubmit = async (channelIndexAtTheTime) => {
    console.log("handleMessageSubmit", channelIndexAtTheTime);

    setSending(true);
    userInputField.current.value = "";

    if (userInput.trim().length) {
      const res = await axios.post("/api/message", {
        message: userInput,
        channelId: channels[channelIndexAtTheTime]?.id,
      });

      if (res.status !== 200) {
        toast.error("failed to send message");
      } else {
        retrievingMessageData();
        setSending(false);
      }

      await setUserInput("");
    }

    return;
  };

  useEffect(() => {
    scrollMessages();
  }, [sending]);

  // get data every second
  useEffect(() => {
    console.log("channel index", creatingNewChannel, channelIndex);

    if (switchingChannels) {
      getMessages();
      setSwitchingChannels(false);
    }

    const interval = setInterval(() => {
      if (
        !loading &&
        !creatingNewChannel &&
        !initialLoad &&
        !switchingChannels
      ) {
        retrievingMessageData();
      }
    }, 1000);

    if (loading) clearInterval(interval);

    return () => clearInterval(interval);
  }, [channelIndex]);

  if (channels)
    return (
      <div className="lg:overflow-y-scroll lg:h-screen lg:flex scrollbar-hidden">
        <Head>
          <title>Chat App | Frontend Devs</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {modal && <ChannelModal setDisplayChannels={setDisplayChannels} />}

        {drawer && (
          <Drawer
            displayChannels={displayChannels}
            setDisplayChannels={setDisplayChannels}
            getMessages={getMessages}
          />
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
            // <div className="text-blue-500 text-4xl container grid place-items-center mt-12 mb-auto">
            <div className="lg:mt-auto pt-8 px-4 lg:px-8 scrollbar-hidden">
              {/* <Icon icon="eos-icons:loading" /> */}
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <MessageLoader key={item} />
              ))}
            </div>
          ) : (
            <div
              id="messages-div"
              className="lg:mt-auto pt-8 px-4 overflow-y-scroll scrollbar-hidden"
            >
              {messages?.length > 0 ? (
                <>
                  {messages?.map((item, index) => (
                    <div key={index}>
                      {
                        <div className="container my-3 flex items-center justify-center">
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
                            name={message?.user?.name}
                            image={message?.user?.image}
                            date={message?.createdAt}
                            message={message?.message}
                          />
                        </div>
                      ))}
                    </div>
                  ))}

                  {sending && (
                    <div className="lg:container max-w-7xl">
                      <Message
                        name={session?.user?.name}
                        image={session?.user?.image}
                        date={false}
                        message={userInput}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {sending ? (
                    <div className="lg:container max-w-7xl">
                      <Message
                        name={session?.user?.name}
                        image={session?.user?.image}
                        date={false}
                        message={userInput}
                      />
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 mb-4">
                      Be the first to start this conversation
                    </p>
                  )}
                </>
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
                onKeyPress={(e) =>
                  e.key === "Enter" && handleMessageSubmit(channelIndex)
                }
              />
              <button
                className="text-white text-xl bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed w-9 h-9 rounded-lg grid place-content-center"
                disabled={!userInput.trim().length}
                onClick={(e) => handleMessageSubmit(channelIndex)}
              >
                <Icon icon="fe:paper-plane" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
