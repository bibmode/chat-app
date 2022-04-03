import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { AppContext } from "./Layout";
import axios from "axios";
import { useRouter } from "next/router";

const ChannelModal = ({ setDisplayChannels }) => {
  const {
    setModal,
    creatingNewChannel,
    setCreatingNewChannel,
    toast,
    setChannels,
    channels,
    messages,
    setMessages,
    setChannelIndex,
  } = useContext(AppContext);
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleSubmit = async ({ userName, description }) => {
    setDisabled(true);

    const res = await axios.post("/api/channel", { userName, description });

    if (res.status === 200) {
      await setCreatingNewChannel(true);
      await setChannels(res.data.channels);
      await setDisplayChannels(res.data.channels);

      const latestChannel = await channels.length;
      await setChannelIndex(latestChannel);
      await setMessages([]);
      await setCreatingNewChannel(false);
    } else {
      toast.error("failed to add channel");
    }

    closeModal();
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      description: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required")
        .test("len", "A channel with that name already exists", (val) => {
          const channelNames = channels.map((channel) =>
            channel.name.toUpperCase()
          );

          return !channelNames.includes(val?.toUpperCase()) || val.length === 0;
        }),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="absolute z-40">
      {/* modal */}
      <div className="fixed z-50 w-5/6 max-w-xl h-fit bg-zinc-900 text-gray-50 rounded-lg left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 py-7 px-6 sm:px-10">
        <h3 className="uppercase">new channel</h3>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-end"
          id="channel-form"
        >
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            disabled={disabled}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            placeholder="Channel name"
            className={`rounded-lg bg-zinc-700 mt-4 py-3 px-4 outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full ${
              formik.touched.userName && formik.errors.userName
                ? "border-2 border-rose-600"
                : "border-none"
            }`}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="self-start text-sm text-rose-600 ml-1">
              {formik.errors.userName}
            </div>
          ) : null}

          <textarea
            name="description"
            id="description"
            cols="35"
            rows="7"
            disabled={disabled}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Channel description"
            className={`rounded-lg bg-zinc-700 mt-4 py-3 px-4 outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full resize-none ${
              formik.touched.description && formik.errors.description
                ? "border-2 border-rose-600"
                : "border-none"
            }`}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="self-start text-sm text-rose-600 ml-1">
              {formik.errors.description}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={disabled}
            className="bg-blue-600 rounded-md py-1 px-6 w-fit mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
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
