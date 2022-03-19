import { createContext, useState } from "react";
import Drawer from "./Drawer";

export const AppContext = createContext("");

const Layout = (props) => {
  const [drawer, setDrawer] = useState(true);
  const [drawerToggle, setDrawerToggle] = useState(false);

  return (
    <>
      {drawer && (
        <Drawer
          drawerToggle={drawerToggle}
          setDrawerToggle={setDrawerToggle}
          setDrawer={setDrawer}
        />
      )}
      <AppContext.Provider value={{ drawer, setDrawer }}>
        <main className="font-Noto">{props.children}</main>
      </AppContext.Provider>
    </>
  );
};

export default Layout;
