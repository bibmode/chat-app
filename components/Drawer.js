import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./Layout";
import MembersLoader from "./loaders/MembersLoader";
import ProfileBar from "./ProfileBar";

const Drawer = ({ displayChannels, setDisplayChannels, getMessages }) => {
  const {
    setModal,
    drawerToggle,
    setDrawerToggle,
    setDrawer,
    channelIndex,
    setChannelIndex,
    channels,
    switchingChannels,
    setSwitchingChannels,
  } = useContext(AppContext);

  const [members, setMembers] = useState(null);
  const [membersLoader, setMembersLoader] = useState(false);

  const addUserToChannel = async (channelId) => {
    await setMembersLoader(true);
    const res = await axios.patch("/api/user", { channelId });

    if (res?.data?.members?.length) {
      await setMembers(res.data.members);
      await setMembersLoader(false);
    }
  };

  const searchChannels = (e) => {
    const foundItems = channels?.filter((item) =>
      item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (foundItems.length) {
      setDisplayChannels(foundItems);
    } else {
      setDisplayChannels(null);
    }

    if (e.target.value.trim() === "") {
      setDisplayChannels(channels);
    }
  };

  const handleToggle = async (channelId) => {
    // setSending(false);
    // find the channel index with the same Id
    const getOriginalIndex = channels
      .map((channel) => channel.id === channelId && true)
      .indexOf(true);
    setSwitchingChannels(true);
    setChannelIndex(getOriginalIndex);
    addUserToChannel(channelId);
    setDrawerToggle(!drawerToggle);
  };

  const goBack = () => {
    setDrawerToggle(!drawerToggle);
    setDisplayChannels(channels);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      <div className="fixed pt-16 lg:pt-0 lg:relative lg:static px-5 z-30 w-5/6 max-w-[338px] h-screen bg-zinc-900">
        {drawerToggle ? (
          <div className="flex flex-col h-screen">
            {/* channels */}
            <div className="text-gray-50 flex justify-between items-center py-4 box-shadow-xl">
              <h1 className="font-semibold">Channels</h1>
              <button
                className="p-2 bg-gray-600/30 text-white rounded-md"
                onClick={openModal}
              >
                <Icon icon="akar-icons:plus" />
              </button>
            </div>

            {/* search bar */}
            <div className="bg-zinc-600/50 w-full flex items-center p-3 mt-4 mb-6 rounded-lg ">
              <button className="text-white">
                <Icon icon="fa-solid:search" />
              </button>
              <input
                className="bg-transparent text-gray-50 px-4 outline-none border-none"
                type="text"
                name="search"
                id="search"
                autoComplete="off"
                placeholder="Search"
                onChange={searchChannels}
              />
            </div>

            {/* list of channels */}
            <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-20">
              {displayChannels?.map((channel) => (
                <button
                  key={channel.id}
                  className="flex items-center mb-4 text-gray-50/80 uppercase text-md font-semibold w-full text-left"
                  onClick={() => handleToggle(channel.id)}
                >
                  <div className="w-10 h-10 bg-zinc-800 grid place-items-center rounded-lg mr-4 text-white">
                    <p>{channel.name[0]}</p>
                  </div>

                  <h3 className="grow inline-block uppercase">
                    {channel.name}
                  </h3>
                </button>
              ))}
            </div>

            {/* profile bar */}
            <ProfileBar />
          </div>
        ) : (
          <>
            {/* channel details */}
            <div className="text-gray-50 flex items-center py-4 box-shadow-xl">
              <button onClick={goBack} className="p-2 mr-2 text-white">
                <Icon icon="ic:round-arrow-back-ios-new" />
              </button>
              <h1 className="font-semibold">All channels</h1>
            </div>

            {/* details bar */}
            <div className="w-full p-3 mt-4 mb-8 text-gray-50">
              <h2 className="text-md uppercase font-semibold">
                {channels[channelIndex]?.name}
              </h2>
              <p className="pt-4">{channels[channelIndex]?.description}</p>
            </div>

            {/* list of memebrs */}
            <h2 className="text-gray-50 font-semibold pb-6">MEMBERS</h2>
            {membersLoader ? (
              <div>
                {[1, 2, 3].map((item) => (
                  <MembersLoader key={item} />
                ))}
              </div>
            ) : (
              members?.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 text-gray-50/80 uppercase text-md font-semibold"
                >
                  <div className="relative overflow-hidden w-10 h-10 bg-gray-800 grid place-items-center rounded-lg mr-4 text-white">
                    <Image
                      src={member.image}
                      alt="profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3>{member.name}</h3>
                </div>
              ))
            )}

            {/* profile bar */}
            <ProfileBar />
          </>
        )}
      </div>

      {/* underlay */}
      <div
        onClick={closeDrawer}
        className="fixed top-0 z-20 w-screen h-screen bg-gray-900/60 lg:hidden"
      ></div>
    </>
  );
};

export default Drawer;
