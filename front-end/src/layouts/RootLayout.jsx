import React from "react";
import { Outlet } from "react-router";
import MainHeader from "../components/MainHeader";
import SideNavigation from "../components/SideNavigation";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="flex flex-1">
        <SideNavigation />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
