import { createContext, useState, useEffect } from "react";
import Drawer from "./Drawer";

export const AppContext = createContext("");

const getWindowWidth = () => {
  const { innerWidth: width } = window;

  console.log(width);
  return width >= 1024;
};

const Layout = (props) => {
  const [drawer, setDrawer] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [modal, setModal] = useState(true);

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
        }}
      >
        <main className="font-Noto w-full">{props.children}</main>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
