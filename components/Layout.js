import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext("");

const getWindowWidth = () => {
  const { innerWidth: width } = window;

  return width >= 1024;
};

const Layout = (props) => {
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const [channelIndex, setChannelIndex] = useState(0);
  const [creatingNewChannel, setCreatingNewChannel] = useState(false);
  const [switchingChannels, setSwitchingChannels] = useState(false);
  const [dateBlockShow, setDateBlockShow] = useState(false);
  const [dateBlock, setDateBlock] = useState("");
  const [tempMessage, setTempMessage] = useState("");
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    getWindowWidth() ? setDrawer(true) : setDrawer(false);
  }, []);

  return (
    <div>
      <AppContext.Provider
        value={{
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
          switchingChannels,
          setSwitchingChannels,
          dateBlockShow,
          setDateBlockShow,
          dateBlock,
          setDateBlock,
          loading,
          setLoading,
          tempMessage,
          setTempMessage,
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
        <main className="font-Noto w-full">{props.children}</main>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
