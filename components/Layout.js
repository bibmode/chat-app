import { createContext, useState, useEffect } from "react";
import Drawer from "./Drawer";

export const AppContext = createContext("");

const getWindowWidth = () => {
  const { innerWidth: width } = window;

  console.log(width);
  return width >= 1024;
};

const Layout = (props) => {
  const [drawer, setDrawer] = useState(true);
  const [drawerToggle, setDrawerToggle] = useState(false);

  useEffect(() => {
    getWindowWidth() ? setDrawer(true) : setDrawer(false);
  }, []);

  return (
    <div className="lg:flex">
      <AppContext.Provider value={{ drawer, setDrawer }}>
        {drawer && (
          <Drawer
            drawerToggle={drawerToggle}
            setDrawerToggle={setDrawerToggle}
            setDrawer={setDrawer}
          />
        )}
        <main className="font-Noto w-full">{props.children}</main>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
