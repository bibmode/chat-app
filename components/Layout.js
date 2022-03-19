import { createContext, useState } from "react";
import Drawer from "./Drawer";

const AppContext = createContext(null);

const Layout = (props) => {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      {drawer && <Drawer />}
      <AppContext.Provider value={{ drawer, setDrawer }}>
        <main className="font-Noto">{props.children}</main>
      </AppContext.Provider>
    </>
  );
};

export default Layout;
