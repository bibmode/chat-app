import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
import Drawer from "./Drawer";

export const AppContext = createContext("");

const getWindowWidth = () => {
  const { innerWidth: width } = window;

  return width >= 1024;
};

const Layout = (props) => {
  const [drawer, setDrawer] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const [channelIndex, setChannelIndex] = useState(0);
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
        }}
      >
        <main className="font-Noto w-full">{props.children}</main>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
