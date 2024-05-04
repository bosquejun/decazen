import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarContext } from "./layout-context";
import { MainLayout } from "./main-layout";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return <MainLayout>{children}</MainLayout>

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        {/* <SidebarWrapper /> */}
        <NavbarWrapper>
          <main className="max-w-screen-lg self-center">{children}</main>
        </NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
