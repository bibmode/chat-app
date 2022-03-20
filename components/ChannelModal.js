import { useContext } from "react";
import { AppContext } from "./Layout";

const ChannelModal = () => {
  const { setModal } = useContext(AppContext);

  const closeModal = () => {
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="absolute z-40">
      {/* modal */}
      <div className="fixed z-50 w-5/6 max-w-xl h-fit bg-zinc-900 text-gray-50 rounded-lg left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 py-7 px-6 sm:px-10">
        <h3 className="uppercase">new channel</h3>
        <form className="mt-4 flex flex-col items-end" id="channel-form">
          <input
            type="text"
            name="name"
            id="channel-name"
            placeholder="Channel name"
            className="rounded-lg bg-zinc-700 mb-4 py-3 px-4 outline-none border-none w-full"
          />
          <textarea
            name="description"
            id="channel-description"
            cols="35"
            rows="7"
            placeholder="Channel description"
            className="rounded-lg bg-zinc-700 mb-4 py-3 px-4 outline-none border-none w-full resize-none"
          />

          <button
            type="submit"
            className="bg-blue-600 rounded-md py-1 px-6 w-fit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>

      {/* underlay */}
      <div
        className="fixed top-0 w-screen h-screen bg-gray-900/60"
        onClick={closeModal}
      />
    </div>
  );
};

export default ChannelModal;
