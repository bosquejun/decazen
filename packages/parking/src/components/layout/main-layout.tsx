"use client"

import React from "react";
import { NavbarProps, NavbarWrapper } from "../navbar/navbar";


interface Props extends Pick<NavbarProps, "hideLogin" | "darkOnly"> {
    children: React.ReactNode;
}

export const MainLayout = ({ children, ...props }: Props) => {
    return <section className="flex">
        <NavbarWrapper {...props}>
            <main className="md:max-w-screen-xl min-w-[95%] md:min-w-[628px] xl:min-w-[1224px] self-center px-2 md:px-6 py-6">{children}</main>
        </NavbarWrapper>
    </section>;
};
