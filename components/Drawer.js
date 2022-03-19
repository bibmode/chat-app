import { Icon } from "@iconify/react";

const channels = [
  "Front-end developers",
  "random",
  "BACK-END",
  "CATS AND DOGS",
  "Welcome",
];

const Drawer = () => {
  return (
    <>
      <div className="fixed px-5 z-50 w-5/6 h-screen bg-gray-900">
        {/* channels */}
        <>
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
            <div
              key={channel}
              className="flex items-center mb-4 text-gray-50/80 uppercase text-md font-semibold"
            >
              <div className="w-10 h-10 bg-gray-800 grid place-items-center rounded-lg mr-4 text-white">
                <p>{channel[0]}</p>
              </div>
              <h3>{channel}</h3>
            </div>
          ))}
        </>
      </div>

      {/* underlay */}
      <div className=" fixed top-0 z-40 w-screen h-screen bg-gray-900/60"></div>
    </>
  );
};

export default Drawer;
