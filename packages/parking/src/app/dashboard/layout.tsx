"use client"

import { useLockedBody } from "@/components/hooks/useBodyLock";
import { SidebarContext } from "@/components/layout/layout-context";
import { DashboardNavbarWrapper } from "@/components/navbar/dashboard-navbar";
import { SidebarWrapper } from "@/components/sidebar/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [_, setLocked] = useLockedBody(false);
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setLocked(!sidebarOpen);
    };
    return <SidebarContext.Provider
        value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
        }}
    >
        <section className="flex">
            <SidebarWrapper />
            <main className="h-screen flex flex-col w-full">
                <DashboardNavbarWrapper>
                    <div className="w-full flex flex-col items-center">
                        <div className="max-w-screen-lg w-full">
                            {children}
                        </div>
                    </div>
                </DashboardNavbarWrapper>
            </main>
            {/* <NavbarWrapper>
        
      </NavbarWrapper> */}
        </section>
    </SidebarContext.Provider>
}