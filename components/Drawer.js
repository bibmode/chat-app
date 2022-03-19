import { Icon } from "@iconify/react";
import Image from "next/image";

const channels = [
  "Front-end developers",
  "random",
  "BACK-END",
  "CATS AND DOGS",
  "Welcome",
];

const members = [
  "Xanthe Neal",
  "Nellie Francis",
  "Denzel Barrett",
  "Shaunna Firth",
  "CATS AND DOGS",
  "Xanthe Neal",
];

const Drawer = ({ drawerToggle, setDrawerToggle, setDrawer }) => {
  const handleToggle = () => {
    setDrawerToggle(!drawerToggle);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };
  return (
    <>
      <div className="fixed px-5 z-50 w-5/6 h-screen bg-zinc-900">
        {drawerToggle ? (
          <>
            {/* channels */}
            <div className="text-gray-50 flex justify-between items-center py-4 box-shadow-xl">
              <h1 className="font-semibold">Channels</h1>
              <button className="p-2 bg-gray-600/30 text-white rounded-md">
                <Icon icon="akar-icons:plus" />
              </button>
            </div>

            {/* search bar */}
            <div className="bg-gray-700 w-full flex items-center p-3 mt-4 mb-6 rounded-lg ">
              <button className="text-white">
                <Icon icon="fa-solid:search" />
              </button>
              <input
                className="bg-transparent text-gray-50 px-4 outline-none border-none"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
            </div>

            {/* list of channels */}
            {channels.map((channel) => (
              <button
                key={channel}
                className="flex items-center mb-4 text-gray-50/80 uppercase text-md font-semibold w-full text-left"
                onClick={handleToggle}
              >
                <div className="w-10 h-10 bg-gray-800 grid place-items-center rounded-lg mr-4 text-white">
                  <p>{channel[0]}</p>
                </div>

                <h3 className="grow inline-block">{channel}</h3>
              </button>
            ))}

            {/* profile bar */}
            <div className="absolute flex items-center p-4 bottom-0 left-0 bg-stone-900 w-full">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="https://i.pinimg.com/564x/a0/81/55/a08155427a44e000276681a166c65337.jpg"
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <h4 className="ml-5 text-gray-50/80 text-md font-semibold">
                Genevieve Navales
              </h4>

              <button className="text-gray-50/80 text-xl ml-auto">
                <Icon icon="charm:chevron-down" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* channel details */}
            <div className="text-gray-50 flex items-center py-4 box-shadow-xl">
              <button onClick={handleToggle} className="p-2 mr-2 text-white">
                <Icon icon="ic:round-arrow-back-ios-new" />
              </button>
              <h1 className="font-semibold">All channels</h1>
            </div>

            {/* details bar */}
            <div className="w-full p-3 mt-4 mb-8 text-gray-50">
              <h2 className="text-md uppercase font-semibold">
                Front-end developers
              </h2>
              <p className="pt-4">
                Pellentesque sagittis elit enim, sit amet ultrices tellus
                accumsan quis. In gravida mollis purus, at interdum arcu tempor
                non
              </p>
            </div>

            {/* list of memebrs */}
            <h2 className="text-gray-50 font-semibold pb-6">MEMBERS</h2>
            {members.map((members, index) => (
              <div
                key={index}
                className="flex items-center mb-4 text-gray-50/80 uppercase text-md font-semibold"
              >
                <div className="w-10 h-10 bg-gray-800 grid place-items-center rounded-lg mr-4 text-white">
                  <p>{members[0]}</p>
                </div>
                <h3>{members}</h3>
              </div>
            ))}
          </>
        )}
      </div>

      {/* underlay */}
      <div
        onClick={closeDrawer}
        className=" fixed top-0 z-40 w-screen h-screen bg-gray-900/60"
      ></div>
    </>
  );
};

export default Drawer;
