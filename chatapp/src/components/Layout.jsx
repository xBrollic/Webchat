import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  return (
    <main className='App'>
      <Outlet />
    </main>
  );
};

export default Layout;
